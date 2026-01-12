/**
 * Email Utility for HLCC
 * Sends emails using Resend via a serverless function
 */

export interface EmailOptions {
  to: 'info@hlcc.africa' | 'support@hlcc.africa' | 'applications@hlcc.africa';
  subject: string;
  data: Record<string, any>;
  formName: string;
  userEmail?: string;
  userName?: string;
}

const brandColors = {
  navy: '#0f172a',
  blue: '#2563eb',
  gold: '#d97706',
  slate: '#64748b',
  bg: '#f8fafc'
};

const getAutoResponseTemplate = (userName: string, formName: string) => {
  const firstName = userName ? userName.split(' ')[0] : 'there';

  let content = '';
  let subject = '';
  let heroIcon = '✨';

  if (formName.includes('Booking')) {
    subject = "Your Booking Request with HLCC";
    heroIcon = '📅';
    content = `
      <h1 style="color: ${brandColors.navy}; font-size: 24px; margin-bottom: 20px;">We've received your booking request!</h1>
      <p>Hello ${firstName},</p>
      <p>Thank you for choosing HLCC. We're excited to connect with you and explore how we can support your leadership and culture journey.</p>
      <div style="background-color: white; border-left: 4px solid ${brandColors.gold}; padding: 20px; margin: 25px 0; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <p style="margin: 0; font-weight: 600; color: ${brandColors.navy};">What happens next?</p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: ${brandColors.slate};">Our team is currently reviewing your preferences and availability. You can expect a follow-up email from one of our consultants within <strong>24 to 48 business hours</strong> to finalize the details.</p>
      </div>
      <p>In the meantime, feel free to explore our <a href="https://hlcc.africa/services" style="color: ${brandColors.blue}; text-decoration: none;">latest insights</a> on human-centered leadership.</p>
    `;
  } else if (formName.includes('Application')) {
    subject = "Application Received - HLCC Network";
    heroIcon = '🤝';
    content = `
      <h1 style="color: ${brandColors.navy}; font-size: 24px; margin-bottom: 20px;">Thank you for applying!</h1>
      <p>Hello ${firstName},</p>
      <p>We've successfully received your application to join the HLCC Network. We're always looking for professionals who share our conviction for human-centered transformation.</p>
      <div style="background-color: white; border-left: 4px solid ${brandColors.blue}; padding: 20px; margin: 25px 0; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <p style="margin: 0; font-weight: 600; color: ${brandColors.navy};">Our Review Process</p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: ${brandColors.slate};">We carefully review every applicant's profile to ensure alignment with our quality standards and values. Due to the high volume of applications, we will reach out directly if there is a potential fit for upcoming projects or roles.</p>
      </div>
      <p>We appreciate your patience and your interest in our mission.</p>
    `;
  } else {
    subject = "Thank you for reaching out to HLCC";
    heroIcon = '✉️';
    content = `
      <h1 style="color: ${brandColors.navy}; font-size: 24px; margin-bottom: 20px;">We've received your message!</h1>
      <p>Hello ${firstName},</p>
      <p>Thank you for contacting HLCC. We've received your inquiry and a member of our team will get back to you shortly.</p>
      <p>At HLCC, we believe that culture runs the show—and we're committed to helping you make sure it works for you and your people.</p>
      <div style="margin: 30px 0; text-align: center;">
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 30px;" />
        <p style="font-size: 14px; color: ${brandColors.slate}; italic">"Leading with heart and impact."</p>
      </div>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: ${brandColors.bg}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: left;">
                    <img src="https://hlcc.africa/assets/img/HLCC.png" alt="HLCC" style="height: 45px; width: auto;" />
                  </td>
                </tr>
                <!-- Hero Icon -->
                <tr>
                  <td style="padding: 0 40px; font-size: 40px;">
                    ${heroIcon}
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px; line-height: 1.6; color: #334155; font-size: 16px;">
                    ${content}
                    <p style="margin-top: 40px;">Best regards,<br /><strong style="color: ${brandColors.navy};">The HLCC Team</strong></p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: ${brandColors.navy}; padding: 30px 40px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">Human-Centered Leadership & Culture Consulting</p>
                    <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 12px;">Nairobi • Johannesburg • Kigali • Dar es Salaam</p>
                    <div style="margin-top: 20px;">
                      <a href="https://hlcc.africa" style="color: #ffffff; text-decoration: none; font-size: 12px; margin: 0 10px;">Website</a>
                      <a href="https://linkedin.com/company/hlcc" style="color: #ffffff; text-decoration: none; font-size: 12px; margin: 0 10px;">LinkedIn</a>
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin-top: 20px; color: #94a3b8; font-size: 12px;">© ${new Date().getFullYear()} HLCC. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return { subject, html };
};

export async function sendEmail(options: EmailOptions) {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: sans-serif; color: #1e293b; background-color: #f1f5f9; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 20px; color: #ffffff;">
              <h2 style="margin: 0; font-size: 18px;">Internal Notification</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">Source: ${options.formName}</p>
            </div>
            <div style="padding: 30px;">
              <h3 style="margin-top: 0; color: #0f172a;">Form Details</h3>
              <table width="100%" style="border-collapse: collapse;">
                ${Object.entries(options.data)
        .map(([key, value]) => `
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; width: 35%;">${key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px;">${Array.isArray(value) ? value.join(', ') : (value === true ? 'Yes' : (value === false ? 'No' : value))}</td>
                    </tr>
                  `).join('')}
              </table>
              <div style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 12px; color: #64748b;">
                <strong>Submission Logged:</strong> ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const autoResponse = options.userEmail
      ? getAutoResponseTemplate(options.userName || '', options.formName)
      : null;

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html,
        userEmail: options.userEmail,
        userSubject: autoResponse?.subject,
        userHtml: autoResponse?.html,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to send email';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (e) {
        // If not JSON, try reading as text
        const textError = await response.text().catch(() => '');
        errorMessage = textError || `Service error: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
