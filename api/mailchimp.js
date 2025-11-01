/**
 * Vercel Serverless Function for Mailchimp Integration
 * 
 * This file is automatically deployed as a serverless function by Vercel.
 * No separate backend needed - just deploy your frontend!
 * 
 * Environment variables needed in Vercel:
 * - MAILCHIMP_API_KEY
 * - MAILCHIMP_AUDIENCE_ID
 */

import crypto from 'crypto';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    // Parse request body if it's a string
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        res.status(400).json({ success: false, error: 'Invalid JSON body' });
        return;
      }
    }

    const { contact, formType } = body || {};

    // Validate required fields
    if (!contact || !contact.email) {
      res.status(400).json({ success: false, error: 'Email is required' });
      return;
    }

    // Get Mailchimp credentials from environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('Mailchimp credentials not configured');
      res.status(500).json({ 
        success: false,
        error: 'Server configuration error. Please contact support.' 
      });
      return;
    }

    // Extract server prefix from API key (format: xxxxxx-usX)
    const serverPrefix = apiKey.split('-')[1];
    if (!serverPrefix) {
      res.status(500).json({ 
        success: false,
        error: 'Invalid API key format' 
      });
      return;
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

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`Failed to parse Mailchimp response: ${response.status} ${response.statusText}`);
    }

    // If member already exists, update them instead
    if (response.status === 400 && data.title === 'Member Exists') {
      // Create member hash (MD5 of lowercase email)
      // Mailchimp uses MD5 hash of the lowercase email address
      const emailHash = crypto
        .createHash('md5')
        .update(contact.email.toLowerCase())
        .digest('hex');
      
      const updateUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${emailHash}`;
      
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to update contact');
      }

      res.status(200).json({ 
        success: true, 
        message: 'Contact updated in Mailchimp' 
      });
      return;
    }

    if (!response.ok) {
      throw new Error(data.detail || `HTTP ${response.status}`);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Successfully added to Mailchimp' 
    });
    return;

  } catch (error) {
    console.error('Mailchimp API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Unknown error occurred' 
    });
    return;
  }
}

