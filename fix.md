# Troubleshooting Google Sign-In "400 Malformed Request" Error

This guide documents the steps taken to resolve the Google Sign-In "400 Malformed Request" error encountered during the deployment of the InternMy application.

## The Problem
When attempting to sign in with Google on the Vercel deployment, users were redirected to a Google error page displaying:
> **400. That’s an error.**
> The server cannot process the request because it is malformed. It should not be retried.

## Root Cause
The error was caused by a mismatch between the **Authorized Redirect URI** configured in the Google Cloud Console and the actual callback URL used by Supabase. Specifically, the Supabase project's callback URL was not whitelisted in the Google OAuth client settings.

## The Solution

### 1. Identify the Correct Callback URL
- Go to the **Supabase Dashboard** -> **Authentication** -> **Providers** -> **Google**.
- Copy the **Callback URL**. It typically looks like:
  `https://<your-project-id>.supabase.co/auth/v1/callback`

### 2. Update Google Cloud Console
- Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
- Select the project associated with your OAuth Client ID.
- Go to **APIs & Services** -> **Credentials**.
- Click on the **OAuth 2.0 Client ID** being used.
- Scroll down to **"Authorized redirect URIs"**.
- Click **"ADD URI"** and paste the Supabase Callback URL.
- Click **Save**.

### 3. Clear Cache / Use Incognito
- Google's OAuth changes can take a few minutes to propagate.
- Browsers may cache the old redirect configuration.
- **Verification:** Open an **Incognito Window** and try signing in again. If it works there, the issue is resolved, and the main browser cache will eventually update.

## Additional Checks (If the issue persists)
- **Environment Variables:** Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set in the Vercel project settings.
- **Exact Match:** Ensure there are no trailing spaces or typos in the URL pasted into Google Cloud Console.
- **Protocol:** Ensure the URL uses `https://` (not `http://`).
