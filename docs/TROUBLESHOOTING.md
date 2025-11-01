# Troubleshooting Mailchimp Integration

## Serverless Function Crashes (500 Error)

If you're seeing `FUNCTION_INVOCATION_FAILED`, check:

### 1. Environment Variables
Make sure `.env.local` (for local) or Vercel dashboard (for production) has:
```env
MAILCHIMP_API_KEY=your-key-here
MAILCHIMP_AUDIENCE_ID=your-id-here
```

### 2. Check Terminal/Console Logs
When running `vercel dev`, errors will appear in your terminal. Look for:
- "Mailchimp credentials not configured" → Environment variables missing
- "Invalid API key format" → API key doesn't match expected format
- Network errors → Check your internet connection
- Mailchimp API errors → Check your API key permissions

### 3. Test API Key Format
Your Mailchimp API key should look like:
```
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1
```
The `-us1` (or `-us2`, etc.) part is the server prefix and is required.

### 4. Verify Audience ID
Your Audience ID should be:
- Found in: Mailchimp → Audience → Settings → Audience name and defaults
- Looks like: `a1b2c3d4e5` (alphanumeric, usually 10 characters)

### 5. Common Errors

**"Server configuration error"**
→ Environment variables not set or not loaded. Restart `vercel dev` after adding them.

**"Invalid API key format"**
→ Your API key doesn't have the `-usX` suffix. Generate a new one from Mailchimp.

**"Member Exists" (not an error)**
→ Contact already in Mailchimp. Function will update them automatically.

**Network/CORS errors**
→ Make sure you're using `vercel dev` not `npm run dev` for local testing.

---

## Debug Steps

1. **Check `.env.local` exists and has correct values**
2. **Restart `vercel dev`** after changing environment variables
3. **Test the endpoint directly:**
   ```bash
   curl -X POST http://localhost:3000/api/mailchimp \
     -H "Content-Type: application/json" \
     -d '{"contact":{"email":"test@example.com","firstName":"Test"},"formType":"contact"}'
   ```
4. **Check Mailchimp Activity Log** for API errors
5. **Verify API key has proper permissions** in Mailchimp

---

## Still Not Working?

1. Check terminal for full error stack trace
2. Verify Mailchimp account is active (not suspended)
3. Check Mailchimp API status page
4. Try creating a new API key in Mailchimp
5. Verify Audience ID is correct (copy directly from Mailchimp dashboard)

