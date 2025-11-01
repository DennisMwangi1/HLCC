# 🚀 Quick Start: Testing Your Mailchimp Integration

Since you've added your API keys to `.env`, here's how to test it:

## ✅ For Local Testing (Right Now)

### Step 1: Rename/Copy your `.env` file

```bash
# If you have .env, rename it to .env.local (better for local dev)
mv .env .env.local
```

Or create `.env.local` with:

```env
MAILCHIMP_API_KEY=your-key-here
MAILCHIMP_AUDIENCE_ID=your-id-here
```

### Step 2: Install Vercel CLI (if not installed)

```bash
npm i -g vercel
```

### Step 3: Start local development with API support

```bash
vercel dev
```

This will:

- ✅ Start your React app
- ✅ Start the `/api/mailchimp` serverless function locally
- ✅ Use your `.env.local` variables

### Step 4: Test a form

1. Open <http://localhost:3000> (or whatever port Vercel shows)
2. Submit any form
3. Check your Mailchimp audience - you should see the contact!

---

## ⚠️ Important: For Production (Vercel)

Your `.env` file won't work in production! You MUST add variables to Vercel:

1. Go to <https://vercel.com/dashboard>
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `MAILCHIMP_API_KEY` = (paste your key)
   - `MAILCHIMP_AUDIENCE_ID` = (paste your ID)
5. Select: Production, Preview, Development
6. Click Save
7. **Redeploy** your project (or it will auto-deploy on next push)

---

## 🧪 Quick Test Checklist

- [ ] API keys in `.env.local` (for local)
- [ ] `vercel dev` running (not `npm run dev`)
- [ ] Check terminal for errors when submitting
- [ ] Submit a test form
- [ ] Check Mailchimp audience
- [ ] Add variables to Vercel dashboard (for production)
- [ ] Deploy to production

---

## ❌ Troubleshooting Server Errors

If you see `FUNCTION_INVOCATION_FAILED` or `500 INTERNAL_SERVER_ERROR`:

1. **Check your terminal** where `vercel dev` is running - the actual error will be shown there
2. **Verify environment variables** are loaded:

   ```bash
   # In your terminal, verify variables exist:
   echo $MAILCHIMP_API_KEY
   echo $MAILCHIMP_AUDIENCE_ID
   ```

3. **Common issues:**
   - Missing `.env.local` file → Create it with your keys
   - Wrong API key format → Should be `xxxxx-us1` format
   - Invalid Audience ID → Copy directly from Mailchimp dashboard
   - Need to restart `vercel dev` → Stop and restart after adding env vars

4. **See `TROUBLESHOOTING.md`** for detailed debugging steps

---

That's it! Your forms are ready to go. 🎉
