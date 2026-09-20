function generateEmailHTML({ name, email, subject, message }) {
  const dateStr = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #060609; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e4e4e7;">
  <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #060609; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #0e0e16; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); padding: 3px 0 0 0;"></td>
          </tr>
          <tr>
            <td style="padding: 24px 30px; background-color: #0a0a10; border-bottom: 1px solid #1e293b;">
              <div style="font-size: 20px; font-weight: 800; color: #00ff88;">&lt;AKSHAY /&gt;</div>
              <div style="font-size: 11px; color: #94a3b8;">CYBERSECURITY & DEV PORTFOLIO GATEWAY</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 30px; background-color: #0c0c14; border-bottom: 1px solid #1e293b; font-size: 12px; color: #64748b;">
              📅 <strong>Timestamp:</strong> ${dateStr} IST
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #12121c; border: 1px solid #1e293b; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #1e293b;">
                    <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Sender Name</div>
                    <div style="font-size: 16px; color: #f8fafc; font-weight: 600;">${name}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #1e293b;">
                    <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Email Address</div>
                    <div style="font-size: 15px; color: #00d4ff;">${email}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Subject</div>
                    <div style="font-size: 15px; color: #00ff88; font-weight: 600;">${subject || 'General Inquiry'}</div>
                  </td>
                </tr>
              </table>
              <div style="font-size: 12px; color: #94a3b8; margin-bottom: 8px; font-weight: 700;">💬 Message:</div>
              <div style="background-color: #141420; border-left: 4px solid #00ff88; border: 1px solid #1e293b; border-radius: 6px; padding: 20px; color: #e2e8f0; font-size: 14.5px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, email, subject, message } = body;

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ success: false, error: 'RESEND_API_KEY environment variable not set in Cloudflare' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const emailHTML = generateEmailHTML({ name, email, subject, message });

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'akshaysati1207@gmail.com',
        reply_to: email,
        subject: `⚡ [Portfolio Message] ${subject || 'New Contact'} - ${name}`,
        html: emailHTML
      })
    });

    const data = await resendRes.json();
    return new Response(JSON.stringify({ success: resendRes.ok, data }), {
      status: resendRes.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
