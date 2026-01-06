# Houston Garage Door Pros - Setup Guide

## Google Sheets Form Integration Setup

Form submissions are sent to a Google Sheet. Follow these steps to enable:

### 1. Create a Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name it (e.g., "sheets-writer")
   - Grant no additional roles (we only need Sheets access)
   - Click "Done"
5. Generate a key:
   - Click on the service account you created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download and save securely

### 2. Share the Google Sheet

1. Open your target Google Sheet:
   https://docs.google.com/spreadsheets/d/1uycrfYc48gDe0kpIyJXF29QGcB_o_FgKUyzzveL8BGI/edit

2. Click "Share" button
3. Add the service account email (from step 1) as an Editor
4. Uncheck "Notify people" and click "Share"

### 3. Set Up Sheet Columns

Ensure your sheet has these column headers in Row 1:
| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Phone | Email | Service | Message | Source | Page URL | Referrer | UTM Source | UTM Medium | UTM Campaign |

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in the values from your service account JSON file:
- `GOOGLE_SHEETS_CLIENT_EMAIL`: The "client_email" field
- `GOOGLE_SHEETS_PRIVATE_KEY`: The "private_key" field (keep the \n characters)

Example:
```
GOOGLE_SHEETS_CLIENT_EMAIL=sheets-writer@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...your key here...\n-----END PRIVATE KEY-----\n"
```

### 5. Vercel Deployment

When deploying to Vercel:
1. Go to Project Settings > Environment Variables
2. Add the same variables from `.env.local`
3. For `GOOGLE_SHEETS_PRIVATE_KEY`, paste the entire key including quotes

## Testing the Form

1. Run locally: `npm run dev`
2. Go to http://localhost:3000/contact/
3. Submit a test form
4. Check your Google Sheet for the new row

## Troubleshooting

- **"Credentials not configured" in console**: Check environment variables are set
- **"Failed to get access token"**: Verify the private key format (should have \n for newlines)
- **"Permission denied"**: Ensure the service account email was added as Editor to the Sheet
- **No data appearing**: Check that the Sheet name is "Sheet1" or update the API route

## Files Modified

- `/src/pages/api/submit-lead.js` - API route for form submission
- `/src/components/LeadForm.js` - Updated form with honeypot and API call
- All phone numbers removed site-wide
- Navigation updated to: Home, Blog, Contact Us
