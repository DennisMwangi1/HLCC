/**
 * Example Mailchimp API Endpoint
 * 
 * For Vercel: Place this file in /api/mailchimp.js
 * For Netlify: Place in /netlify/functions/mailchimp.js
 * For other platforms: Adapt as needed
 * 
 * This endpoint securely handles Mailchimp API calls server-side,
 * keeping your API key safe from client-side exposure.
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { contact, formType } = req.body;

    // Validate required fields
    if (!contact || !contact.email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Get Mailchimp credentials from environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('Mailchimp credentials not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Extract server prefix from API key (format: xxxxxx-usX)
    const serverPrefix = apiKey.split('-')[1];
    if (!serverPrefix) {
      return res.status(500).json({ message: 'Invalid API key format' });
    }

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    // Prepare Mailchimp contact data
    const mailchimpData = {
      email_address: contact.email,
      status: 'subscribed',
      tags: [formType, ...(contact.tags || [])],
    };

    // Add merge fields
    if (contact.firstName || contact.lastName) {
      mailchimpData.merge_fields = {
        ...(contact.firstName && { FNAME: contact.firstName }),
        ...(contact.lastName && { LNAME: contact.lastName }),
      };
    }

    if (contact.phone) {
      mailchimpData.merge_fields = {
        ...mailchimpData.merge_fields,
        PHONE: contact.phone,
      };
    }

    if (contact.company) {
      mailchimpData.merge_fields = {
        ...mailchimpData.merge_fields,
        COMPANY: contact.company,
      };
    }

    // Add custom merge fields
    if (contact.mergeFields) {
      mailchimpData.merge_fields = {
        ...mailchimpData.merge_fields,
        ...contact.mergeFields,
      };
    }

    // Try to create member
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailchimpData),
    });

    let data = await response.json();

    // If member already exists, update them instead
    if (response.status === 400 && data.title === 'Member Exists') {
      const memberHash = Buffer.from(contact.email.toLowerCase()).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      
      const updateUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${memberHash}`;
      
      response = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'subscribed',
          tags: [formType, ...(contact.tags || [])],
          merge_fields: mailchimpData.merge_fields,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update contact');
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Contact updated in Mailchimp' 
      });
    }

    if (!response.ok) {
      throw new Error(data.detail || `HTTP ${response.status}`);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to Mailchimp' 
    });

  } catch (error) {
    console.error('Mailchimp API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Unknown error occurred' 
    });
  }
}

