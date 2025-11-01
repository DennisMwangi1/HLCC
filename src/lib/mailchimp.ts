/**
 * Mailchimp Integration Utility
 *
 * NOTE: For security, Mailchimp API calls should be made from a backend/serverless function,
 * not directly from the client. This utility is designed to work with a backend endpoint.
 *
 * Setup instructions:
 * 1. Create a serverless function (e.g., Vercel/Netlify function) or API route
 * 2. Store your Mailchimp API key and Audience ID as environment variables
 * 3. Update the API_ENDPOINT below to point to your backend endpoint
 *
 * Alternative: If you must use client-side (not recommended for production),
 * set USE_CLIENT_SIDE=true and configure VITE_MAILCHIMP_API_KEY and VITE_MAILCHIMP_AUDIENCE_ID
 */

// Default endpoint for Vercel serverless function
// If deploying elsewhere, set VITE_MAILCHIMP_API_ENDPOINT in .env
const API_ENDPOINT =
  import.meta.env.VITE_MAILCHIMP_API_ENDPOINT || "/api/mailchimp";
const USE_CLIENT_SIDE = import.meta.env.VITE_USE_CLIENT_MAILCHIMP === "true";

export interface MailchimpContact {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  tags?: string[];
  mergeFields?: Record<string, string>;
}

export interface MailchimpSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit a contact to Mailchimp
 * This will add or update a contact in your Mailchimp audience
 */
export async function submitToMailchimp(
  contact: MailchimpContact,
  formType: "contact" | "booking" | "coach" | "facilitator"
): Promise<MailchimpSubmissionResult> {
  try {
    if (USE_CLIENT_SIDE) {
      return await submitToMailchimpClientSide(contact, formType);
    }

    // Backend endpoint approach (recommended)
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact,
        formType,
      }),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Submission failed" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "Successfully submitted to Mailchimp",
    };
  } catch (error) {
    console.error("Mailchimp submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Client-side submission (NOT RECOMMENDED for production)
 * Only use this if you're okay with exposing your API key
 */
async function submitToMailchimpClientSide(
  contact: MailchimpContact,
  formType: "contact" | "booking" | "coach" | "facilitator"
): Promise<MailchimpSubmissionResult> {
  const apiKey = import.meta.env.VITE_MAILCHIMP_API_KEY;
  const audienceId = import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    throw new Error("Mailchimp API key or Audience ID not configured");
  }

  // Extract server prefix from API key (format: xxxxxx-usX)
  const serverPrefix = apiKey.split("-")[1];
  if (!serverPrefix) {
    throw new Error("Invalid Mailchimp API key format");
  }

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  // Prepare Mailchimp contact data
  const mailchimpData: any = {
    email_address: contact.email,
    status: "subscribed",
    tags: [formType, ...(contact.tags || [])],
  };

  // Add merge fields if available
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

  if (contact.mergeFields) {
    mailchimpData.merge_fields = {
      ...mailchimpData.merge_fields,
      ...contact.mergeFields,
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailchimpData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle existing member (update instead of create)
      if (data.title === "Member Exists") {
        // Try to update the member
        const updateUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${btoa(
          contact.email
        )}`;
        const updateResponse = await fetch(updateUrl, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "subscribed",
            tags: [formType, ...(contact.tags || [])],
            merge_fields: mailchimpData.merge_fields,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error(data.detail || "Failed to update contact");
        }

        return {
          success: true,
          message: "Contact updated in Mailchimp",
        };
      }

      throw new Error(data.detail || `HTTP ${response.status}`);
    }

    return {
      success: true,
      message: "Successfully added to Mailchimp",
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Unknown error");
  }
}

/**
 * Helper to extract first and last name from a full name
 */
export function parseName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}
