# 🚀 Quick Mailchimp Setup (Frontend-Only)

This is a **frontend-only** application, but we're using Vercel's serverless functions to securely handle Mailchimp API calls.

## ✅ What's Already Done

- ✅ All 4 forms integrated with Mailchimp
- ✅ API endpoint created at `api/mailchimp.js`
- ✅ Forms automatically submit to Mailchimp

## 📋 Setup (3 Simple Steps)

### 1. Get Mailchimp Credentials

**API Key:**

- Visit: <https://us1.admin.mailchimp.com/account/api/>
- Create or copy your API key (format: `xxxxx-us1`)

**Audience ID:**

- Go to: Audience → Settings → Audience name and defaults
- Copy your Audience ID (looks like: `a1b2c3d4e5`)

### 2. Add Environment Variables to Vercel

**Important:** `.env` files are for local development only. For production, you MUST add variables to Vercel:

1. Open your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Click **Add New**
4. Add these two variables:
   - Name: `MAILCHIMP_API_KEY`, Value: your API key
   - Name: `MAILCHIMP_AUDIENCE_ID`, Value: your audience ID
5. Select all environments: **Production**, **Preview**, and **Development**
6. Click **Save**

**Why?** Vercel serverless functions run on Vercel's servers, not your local machine. They need the variables set in the dashboard.

### 3. Deploy

```bash
git add .
git commit -m "Add Mailchimp integration"
git push
```

Vercel will automatically:

- ✅ Deploy your frontend
- ✅ Deploy the API endpoint at `/api/mailchimp`
- ✅ Use your environment variables

## 🧪 Test It

1. Submit any form on your site
2. Check your Mailchimp audience
3. You should see the new contact! 🎉

## 📁 How It Works

```
User submits form
    ↓
Frontend calls /api/mailchimp
    ↓
Vercel serverless function (api/mailchimp.js)
    ↓
Makes secure API call to Mailchimp
    ↓
Returns success/error to frontend
```

**No separate backend needed!** The `api/` folder is automatically treated as serverless functions by Vercel.

## 🔧 Local Development

### Option 1: Using Vercel CLI (Recommended for testing API)

1. Install Vercel CLI: `npm i -g vercel` (if not already installed)

2. Create `.env.local` with your Mailchimp credentials:

   ```env
   MAILCHIMP_API_KEY=your-api-key-here
   MAILCHIMP_AUDIENCE_ID=your-audience-id-here
   ```

3. Run: `vercel dev`
   - This starts both your frontend AND the API functions locally
   - The `/api/mailchimp` endpoint will work exactly like in production

### Option 2: Frontend-only testing (API won't work)

If you just want to test the UI:

```bash
npm run dev
```

Note: The forms will try to call `/api/mailchimp` but it won't work without `vercel dev` or in production on Vercel.

---

## ❓ Troubleshooting

**"Server configuration error"**

- Check environment variables are set in Vercel
- Redeploy after adding variables

**Forms work but contacts don't appear**

- Check Mailchimp audience settings (may require manual approval)
- Check Mailchimp activity log for API errors

**API endpoint not found**

- Make sure `api/mailchimp.js` exists
- Redeploy to Vercel

---

That's it! Your forms are now integrated with Mailchimp. 🎊
