# Mailchimp Integration Setup Guide

All 4 forms in this application are now integrated with Mailchimp:

1. **Contact Form** (`/contact`)
2. **Booking Form** (Discovery Calls & Consultations)
3. **Coach Application Form** (`/register/coach`)
4. **Facilitator Application Form** (`/register/facilitator`)

## Quick Setup for Frontend-Only App (Vercel)

Since you're using Vercel (I can see your `vercel.json`), setup is super simple - just one API file!

### Step 1: Get Your Mailchimp Credentials

1. **API Key**:
   - Go to <https://us1.admin.mailchimp.com/account/api/>
   - Create a new API key or use an existing one
   - Format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usX` (note the server prefix like `us1`, `us2`, etc.)

2. **Audience ID**:
   - Go to Audience > Settings > Audience name and defaults
   - Find your Audience ID (looks like: `a1b2c3d4e5`)

### Step 2: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:
   - `MAILCHIMP_API_KEY` = your API key
   - `MAILCHIMP_AUDIENCE_ID` = your audience ID
4. Make sure to add them for **Production**, **Preview**, and **Development** environments

### Step 3: Deploy

The `api/mailchimp.js` file is already created. Just:

1. Commit and push to your repository
2. Vercel will automatically detect the API route and deploy it
3. Your forms will now work! 🎉

**That's it!** No separate backend needed - Vercel handles the serverless function automatically.

---

## For Other Hosting Platforms

**Netlify:**

1. Create `netlify/functions/mailchimp.js` (see `api/mailchimp.example.js` for reference)
2. Add environment variables in Netlify dashboard

**Cloudflare Pages:**

- Use Cloudflare Workers for the API endpoint

**Local Development:**

- The API file will work locally, but you'll need to add environment variables to `.env.local`

---

## Alternative Setup (Client-side - Not Recommended)

⚠️ **Warning**: This exposes your API key in client-side code. Only use for development/testing.

1. Set in `.env`:

   ```
   VITE_USE_CLIENT_MAILCHIMP=true
   VITE_MAILCHIMP_API_KEY=your-api-key-here
   VITE_MAILCHIMP_AUDIENCE_ID=your-audience-id-here
   ```

2. Restart your dev server

---

## Mailchimp Audience Setup

### Merge Fields

The integration uses these standard merge fields:

- `FNAME` - First Name
- `LNAME` - Last Name  
- `PHONE` - Phone Number
- `COMPANY` - Company Name

### Custom Merge Fields

Forms also send additional data as custom merge fields:

- **Contact Form**: `SUBJECT`, `MESSAGE`
- **Booking Form**: `NEEDS`, `TIMEFRAME`, `CONTACT_METHOD`, `PREFERRED_DATE`, `PREFERRED_TIME`, `TIMEZONE`, `HOW_HEARD`, `BOOKING_TYPE`
- **Coach/Facilitator Forms**: All form fields as uppercase merge fields

### Tags

Contacts are automatically tagged:

- Form type: `contact`, `booking`, `coach`, `facilitator`
- Booking subtype: `discovery-call`, `consultation`
- Application type: `application`

You can segment contacts in Mailchimp using these tags.

---

## Testing

1. Submit each form with test data
2. Check your Mailchimp audience for the new contact
3. Verify tags and merge fields are populated correctly

---

## Troubleshooting

### "Mailchimp API key or Audience ID not configured"

- Check your `.env` file has the correct variables
- Restart your dev server after changing `.env`
- Verify environment variables in your hosting platform

### "Failed to submit to Mailchimp"

- Check browser console for detailed error messages
- Verify your API key is valid and has proper permissions
- Ensure your Audience ID is correct
- Check if CORS is blocking requests (use backend endpoint)

### Forms submit but contacts don't appear

- Check Mailchimp audience settings (may be set to manual approval)
- Verify API key permissions allow adding contacts
- Check Mailchimp activity log for API errors

---

## Removing Formspree (Optional)

If you're no longer using Formspree, you can remove it:

1. Remove from `package.json`: `@formspree/react`
2. Remove from `src/main.tsx`: `FormspreeProvider` wrapper
3. Run `npm install`

The Mailchimp integration works independently.
