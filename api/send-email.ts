import { Resend } from 'resend';
import formidable from 'formidable';
import { readFile } from 'fs/promises';

interface VercelRequest {
  method: string;
  body: any;
  headers: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
}

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function hasAllowedResumeExtension(filename: string): boolean {
  const ext = filename.toLowerCase().match(/\.[^.]+$/)?.[0];
  return ext ? ALLOWED_EXTENSIONS.includes(ext) : false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Mail server configuration missing' });
  }

  const resend = new Resend(apiKey);

  try {
    const form = formidable({
      multiples: false,
      maxFileSize: MAX_RESUME_SIZE,
    });

    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const to = Array.isArray(fields.to) ? fields.to[0] : fields.to;
    const subject = Array.isArray(fields.subject) ? fields.subject[0] : fields.subject;
    const html = Array.isArray(fields.html) ? fields.html[0] : fields.html;
    const from = Array.isArray(fields.from) ? fields.from[0] : fields.from;
    const formName = Array.isArray(fields.formName) ? fields.formName[0] : fields.formName;
    const userEmail = Array.isArray(fields.userEmail) ? fields.userEmail[0] : fields.userEmail;
    const userSubject = Array.isArray(fields.userSubject) ? fields.userSubject[0] : fields.userSubject;
    const userHtml = Array.isArray(fields.userHtml) ? fields.userHtml[0] : fields.userHtml;

    if (!subject || !html) {
      return res.status(400).json({ error: 'Missing required email fields' });
    }

    const requiresResume = formName === 'Job Application';
    const attachments: Array<{ filename: string; content: Buffer }> = [];

    if (files.resume) {
      const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      const filename = file?.originalFilename || 'resume.pdf';

      if (!file?.filepath) {
        return res.status(400).json({ error: 'Failed to process resume upload' });
      }

      if (!hasAllowedResumeExtension(filename)) {
        return res.status(400).json({ error: 'Only PDF, DOC, or DOCX files are allowed' });
      }

      const buffer = await readFile(file.filepath);

      if (buffer.length > MAX_RESUME_SIZE) {
        return res.status(400).json({ error: 'Resume must be less than 5MB' });
      }

      attachments.push({ filename, content: buffer });
    } else if (requiresResume) {
      return res.status(400).json({ error: 'Resume is required' });
    }

    const teamResponse = await resend.emails.send({
      from: from || 'HLCC Website <notifications@hlcc.africa>',
      to: to || 'applications@hlcc.africa',
      subject,
      html,
      attachments,
    });

    if (teamResponse.error) {
      return res.status(400).json({
        error: teamResponse.error.message || 'Team notification failed',
      });
    }

    if (userEmail && userHtml) {
      await resend.emails.send({
        from: 'HLCC <info@hlcc.africa>',
        to: userEmail,
        subject: userSubject || 'We received your message - HLCC',
        html: userHtml,
      });
    }

    return res.status(200).json({
      success: true,
      id: teamResponse.data?.id,
    });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'httpCode' in err && err.httpCode === 413) {
      return res.status(400).json({ error: 'Resume must be less than 5MB' });
    }

    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';

    return res.status(500).json({ error: errorMessage });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
