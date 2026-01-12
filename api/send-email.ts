import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
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
        const { to, subject, html, from, userEmail, userSubject, userHtml } = req.body;
        console.log('Sending email to:', to);

        // 1. Send notification to HLCC team
        const teamResponse = await resend.emails.send({
            from: from || 'HLCC Website <notifications@hlcc.africa>',
            to: to || 'info@hlcc.africa',
            subject: subject,
            html: html,
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
    } catch (err: any) {
        console.error('Server error caught in handler:', err);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

