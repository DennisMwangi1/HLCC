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
    const form = formidable({ multiples: false });

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
    const userEmail = Array.isArray(fields.userEmail) ? fields.userEmail[0] : fields.userEmail;
    const userSubject = Array.isArray(fields.userSubject) ? fields.userSubject[0] : fields.userSubject;
    const userHtml = Array.isArray(fields.userHtml) ? fields.userHtml[0] : fields.userHtml;

    if (!subject || !html) {
      return res.status(400).json({ error: 'Missing required email fields' });
    }

    const attachments: Array<{ filename: string; content: Buffer }> = [];

    if (files.resume) {
      const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;

      if (file?.filepath) {
        const buffer = await readFile(file.filepath);
        attachments.push({
          filename: file.originalFilename || 'resume.pdf',
          content: buffer,
        });
      }
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