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

const getAutoResponseTemplate = (userName: string, formName: string) => {
  const baseStyle = "font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;";
  const branding = `
    <div style="margin-bottom: 20px;">
      <img src="https://hlcc.africa/assets/img/HLCC.png" alt="HLCC" style="height: 40px;" />
    </div>
  `;

  let content = '';
  let subject = '';

  if (formName.includes('Booking')) {
    subject = "Your Booking Request with HLCC";
    content = `
      <p>Hello ${userName || 'there'},</p>
      <p>Thank you for reaching out to HLCC. We have received your booking request for a ${formName.includes('Discovery') ? 'Discovery Call' : 'Consultation'}.</p>
      <p>Our team is reviewing your requirements and will get back to you within 24-48 business hours to confirm a time that works best.</p>
      <p>We look forward to exploring how we can partner with you to build a thriving culture.</p>
    `;
  } else if (formName.includes('Application')) {
    subject = "Application Received - HLCC Network";
    content = `
      <p>Hello ${userName || 'there'},</p>
      <p>Thank you for your interest in joining the HLCC network as a ${formName.includes('Coach') ? 'Coach' : 'Facilitator'}.</p>
      <p>We have received your application and materials. Our team carefully reviews every applicant to ensure alignment with our human-centered conviction and quality standards.</p>
      <p>If there is a potential fit, we will contact you for an introductory conversation.</p>
    `;
  } else {
    subject = "Thank you for contacting HLCC";
    content = `
      <p>Hello ${userName || 'there'},</p>
      <p>Thank you for contacting HLCC. This is to confirm that we have received your message.</p>
      <p>A member of our team will review your inquiry and get back to you as soon as possible.</p>
    `;
  }

  return {
    subject,
    html: `
      <div style="${baseStyle}">
        ${branding}
        ${content}
        <p style="margin-top: 30px;">Best Regards,<br /><strong>The HLCC Team</strong></p>
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 40px;" />
        <p style="font-size: 12px; color: #999;">Human-Centered Leadership & Culture Consulting (HLCC)</p>
      </div>
    `
  };
};

export async function sendEmail(options: EmailOptions) {
  try {
    const html = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1a365d;">New Submission: ${options.formName}</h2>
        <p>A new form has been submitted on the HLCC website.</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <table style="width: 100%; border-collapse: collapse;">
          ${Object.entries(options.data)
        .map(
          ([key, value]) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%; color: #666; text-transform: capitalize;">
                ${key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
              </td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">
                ${Array.isArray(value) ? value.join(', ') : (value === true ? 'Yes' : (value === false ? 'No' : value))}
              </td>
            </tr>
          `
        )
        .join('')}
        </table>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">
          Sent from HLCC Website Notification System
        </p>
      </div>
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
