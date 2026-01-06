// API route to submit leads to Google Sheets
// Uses Google Sheets API with service account credentials

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      phone,
      email,
      service,
      message,
      source,
      pageUrl,
      referrer,
      timestamp,
      honeypot,
    } = req.body;

    // Honeypot check - reject if filled (bot)
    if (honeypot) {
      return res.status(200).json({ success: true });
    }

    // Basic validation
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // Extract UTM params from pageUrl
    let utmSource = '';
    let utmMedium = '';
    let utmCampaign = '';
    
    try {
      const url = new URL(pageUrl);
      utmSource = url.searchParams.get('utm_source') || '';
      utmMedium = url.searchParams.get('utm_medium') || '';
      utmCampaign = url.searchParams.get('utm_campaign') || '';
    } catch (e) {
      // Invalid URL, continue without UTM params
    }

    // Prepare row data for Google Sheets
    const rowData = [
      timestamp || new Date().toISOString(),
      name,
      phone,
      email || '',
      service || '',
      message || '',
      source || '',
      pageUrl || '',
      referrer || '',
      utmSource,
      utmMedium,
      utmCampaign,
    ];

    // Get credentials from environment variables
    const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1uycrfYc48gDe0kpIyJXF29QGcB_o_FgKUyzzveL8BGI';

    if (!GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEETS_CLIENT_EMAIL) {
      console.error('Missing Google Sheets credentials');
      // Still return success to user but log the error
      // In production, you might want to save to a fallback or send notification
      return res.status(200).json({ success: true, warning: 'Credentials not configured' });
    }

    // Create JWT for Google Sheets API
    const jwt = await createGoogleJWT(GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY);
    
    // Append row to Google Sheets
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_SPREADSHEET_ID}/values/Sheet1!A:L:append?valueInputOption=USER_ENTERED`;
    
    const sheetsResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowData],
      }),
    });

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text();
      console.error('Google Sheets API error:', errorText);
      throw new Error('Failed to write to Google Sheets');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Submit lead error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to create Google JWT token
async function createGoogleJWT(clientEmail, privateKey) {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  // Base64url encode
  const base64urlEncode = (obj) => {
    const str = typeof obj === 'string' ? obj : JSON.stringify(obj);
    return Buffer.from(str)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const headerEncoded = base64urlEncode(header);
  const payloadEncoded = base64urlEncode(payload);
  const signatureInput = `${headerEncoded}.${payloadEncoded}`;

  // Sign with private key
  const crypto = require('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signatureInput);
  
  // Handle escaped newlines in private key
  const formattedKey = privateKey.replace(/\\n/g, '\n');
  const signature = sign.sign(formattedKey, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  const jwt = `${signatureInput}.${signature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to get access token');
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}
