/**
 * Email Utility for HLCC
 * Sends emails using Resend via a serverless function
 */

export interface EmailOptions {
  to: 'info@hlcc.africa' | 'support@hlcc.africa' | 'applications@hlcc.africa';
  subject: string;
  data: Record<string, unknown>;
  formName: string;
  userEmail?: string;
  userName?: string;
}

const brandColors = {
  black: '#050505',
  white: '#ffffff',
  gold: '#D4AF37',
  muted: '#888888',
  bg: '#fafafa',
  border: '#eaeaea'
};

const getAutoResponseTemplate = (userName: string, formName: string) => {
  const firstName = userName ? userName.split(' ')[0] : 'there';

  let content = '';
  let subject = '';
  let preheader = '';

  if (formName.includes('Booking')) {
    subject = "Your Engagement with HLCC";
    preheader = "We have received your booking request.";
    content = `
      <h1 style="color: ${brandColors.black}; font-size: 28px; font-weight: 300; margin-bottom: 24px; font-family: 'Georgia', serif; font-style: italic;">The Dialogue Begins</h1>
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">Dear ${firstName},</p>
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">Thank you for choosing HLCC. We are honored to connect with you and explore how we can support your leadership and culture journey.</p>
      
      <div style="margin: 40px 0; border-top: 1px solid ${brandColors.border}; border-bottom: 1px solid ${brandColors.border}; padding: 30px 0;">
        <p style="margin: 0 0 12px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: ${brandColors.gold};">Next Steps</p>
        <p style="margin: 0; font-size: 14px; font-weight: 300; line-height: 1.8; color: ${brandColors.muted};">Our advisory team is currently reviewing your preferences and availability. You can expect a bespoke response from one of our consultants within 24 to 48 hours to finalize the details of our engagement.</p>
      </div>
      
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">In the meantime, we invite you to explore our <a href="https://hlcc.africa/insights" style="color: ${brandColors.gold}; text-decoration: none; border-bottom: 1px solid ${brandColors.gold}; padding-bottom: 2px;">latest insights</a> on human-centered transformation.</p>
    `;
  } else if (formName.includes('Application')) {
    subject = "Application Received - HLCC Network";
    preheader = "Thank you for your application to join our network.";
    content = `
      <h1 style="color: ${brandColors.black}; font-size: 28px; font-weight: 300; margin-bottom: 24px; font-family: 'Georgia', serif; font-style: italic;">Application Received</h1>
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">Dear ${firstName},</p>
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">We have successfully received your application to join the HLCC Network. We are always seeking exceptional professionals who share our conviction for human-centered transformation.</p>
      
      <div style="margin: 40px 0; border-top: 1px solid ${brandColors.border}; border-bottom: 1px solid ${brandColors.border}; padding: 30px 0;">
        <p style="margin: 0 0 12px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: ${brandColors.gold};">Our Curation Process</p>
        <p style="margin: 0; font-size: 14px; font-weight: 300; line-height: 1.8; color: ${brandColors.muted};">We meticulously review every applicant's profile to delicately ascertain alignment with our quality standards and values. Due to the high volume of applications, we will reach out directly to coordinate an introductory dialogue should there be a potential fit for upcoming engagements.</p>
      </div>
      
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">We deeply appreciate your patience and your interest in our mission.</p>
    `;
  } else {
    subject = "Your Inquiry - HLCC";
    preheader = "We have received your private inquiry.";
    content = `
      <h1 style="color: ${brandColors.black}; font-size: 28px; font-weight: 300; margin-bottom: 24px; font-family: 'Georgia', serif; font-style: italic;">Inquiry Received</h1>
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">Dear ${firstName},</p>
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">Thank you for contacting HLCC. We have received your inquiry securely, and a dedicated member of our team will respond to you shortly.</p>
      <p style="color: ${brandColors.black}; font-size: 15px; font-weight: 300; line-height: 1.8;">At HLCC, we believe that culture drives performance—and we are committed to helping you ensure it works seamlessly for your people and your vision.</p>
      
      <div style="margin: 50px 0 20px; text-align: center;">
        <p style="font-size: 16px; color: ${brandColors.gold}; font-family: 'Georgia', serif; font-style: italic; font-weight: 300;">"Leading with heart and impact."</p>
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
      <body style="margin: 0; padding: 0; background-color: ${brandColors.bg}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <span style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
          ${preheader}
        </span>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${brandColors.bg};">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: ${brandColors.white}; border: 1px solid ${brandColors.border};">
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 50px 40px 0 40px;">
                    <img src="https://hlcc.africa/assets/img/HLCC.png" alt="HLCC" style="height: 35px; width: auto; display: block;" />
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 50px 50px 40px 50px;">
                    ${content}
                    <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid ${brandColors.border};">
                      <p style="margin: 0; color: ${brandColors.black}; font-size: 14px; font-weight: 300;">Warm regards,</p>
                      <p style="margin: 5px 0 0 0; color: ${brandColors.black}; font-size: 16px; font-family: 'Georgia', serif; font-style: italic;">The HLCC Team</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: ${brandColors.black}; padding: 40px 50px; text-align: center;">
                    <p style="margin: 0 0 15px 0; color: ${brandColors.gold}; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em;">Human-Centered Leadership & Culture Consulting</p>
                    <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 11px; font-weight: 300; letter-spacing: 0.05em;">
                      Nairobi • Johannesburg • Kigali • Dar es Salaam
                    </p>
                    <div style="margin-top: 30px;">
                      <a href="https://hlcc.africa" style="color: ${brandColors.white}; text-decoration: none; font-size: 11px; margin: 0 15px; font-weight: 300; text-transform: uppercase; letter-spacing: 0.1em;">Website</a>
                      <a href="https://linkedin.com/company/hlcc" style="color: ${brandColors.white}; text-decoration: none; font-size: 11px; margin: 0 15px; font-weight: 300; text-transform: uppercase; letter-spacing: 0.1em;">LinkedIn</a>
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin-top: 30px; color: ${brandColors.muted}; font-size: 10px; font-weight: 300; letter-spacing: 0.05em; text-transform: uppercase;">© ${new Date().getFullYear()} HLCC. All rights reserved.</p>
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
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${brandColors.bg}; -webkit-font-smoothing: antialiased;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${brandColors.bg};">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: ${brandColors.white}; border: 1px solid ${brandColors.border};">
                  <tr>
                    <td style="background-color: ${brandColors.black}; padding: 30px 40px;">
                      <h2 style="margin: 0; font-size: 14px; font-weight: 400; color: ${brandColors.gold}; text-transform: uppercase; letter-spacing: 0.1em;">Internal Intelligence</h2>
                      <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.7); font-size: 18px; font-family: 'Georgia', serif; font-style: italic;">${options.formName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px;">
                      <h3 style="margin: 0 0 25px 0; color: ${brandColors.black}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid ${brandColors.border}; padding-bottom: 15px;">Engagement Details</h3>
                      <table width="100%" style="border-collapse: collapse;">
                        ${Object.entries(options.data)
        .map(([key, value]) => `
                            <tr>
                              <td style="padding: 15px 0; border-bottom: 1px solid rgba(0,0,0,0.05); color: ${brandColors.muted}; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; width: 35%; vertical-align: top;">
                                ${key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                              </td>
                              <td style="padding: 15px 0 15px 15px; border-bottom: 1px solid rgba(0,0,0,0.05); color: ${brandColors.black}; font-size: 14px; font-weight: 300; line-height: 1.6; vertical-align: top;">
                                ${Array.isArray(value) ? value.join(', ') : (value === true ? 'Yes' : (value === false ? 'No' : value))}
                              </td>
                            </tr>
                          `).join('')}
                      </table>
                      <div style="margin-top: 40px; padding: 20px; background-color: ${brandColors.bg}; border: 1px solid ${brandColors.border}; font-size: 11px; color: ${brandColors.muted}; text-align: center; letter-spacing: 0.05em; font-weight: 300;">
                        RECEIVED ON ${new Date().toLocaleString().toUpperCase()}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
      } catch {
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
