import { Resend } from 'resend';
import formidable from 'formidable';

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
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('API Request received:', req.method);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not defined in environment variables');
        return res.status(500).json({ error: 'Mail server configuration missing' });
    }

    try {
        const form = formidable({ multiples: false });

        const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
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

        const attachments = [];
        if (files.resume) {
            const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
            attachments.push({
                filename: file.originalFilename || 'resume.pdf',
                content: await file.toBuffer(),
            });
        }

        console.log('Sending email to:', to);

        // 1. Send notification to HLCC team
        const teamResponse = await resend.emails.send({
            from: from || 'HLCC Website <notifications@hlcc.africa>',
            to: to || 'info@hlcc.africa',
            subject: subject,
            html: html,
            attachments: attachments,
        });

        if (teamResponse.error) {
            console.error('Resend team notification error:', teamResponse.error);
            return res.status(400).json({ error: teamResponse.error.message || 'Team notification failed' });
        }

        console.log('Team notification sent successfully:', teamResponse.data?.id);

        // 2. Send automated response to user if userEmail is provided
        if (userEmail && userHtml) {
            console.log('Sending automated response to:', userEmail);
            const userResponse = await resend.emails.send({
                from: 'HLCC <info@hlcc.africa>',
                to: userEmail,
                subject: userSubject || 'We received your message - HLCC',
                html: userHtml,
            });

            if (userResponse.error) {
                console.error('Resend automated response error:', userResponse.error);
            } else {
                console.log('Automated response sent successfully:', userResponse.data?.id);
            }
        }

        return res.status(200).json({ success: true, id: teamResponse.data?.id });
    } catch (err: unknown) {
        console.error('Server error caught in handler:', err);
        const errorMessage = err instanceof Error ? err.message : 'Internal server error';
        return res.status(500).json({ error: errorMessage });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

