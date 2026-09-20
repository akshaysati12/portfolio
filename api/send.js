import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #060609; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7;">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #060609; padding: 30px 10px;">
    <tr>
      <td align="center">
        
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #0e0e16; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 255, 136, 0.08);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); padding: 3px 0 0 0;"></td>
          </tr>
          <tr>
            <td style="padding: 24px 30px; background-color: #0a0a10; border-bottom: 1px solid #1e293b;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: 'Courier New', monospace; font-size: 20px; font-weight: 800; color: #00ff88; letter-spacing: 1px;">
                      &lt;<span style="color: #00d4ff;">AKSHAY</span> /&gt;
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; font-family: 'Courier New', monospace; margin-top: 4px;">
                      CYBERSECURITY & DEV PORTFOLIO GATEWAY
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(0, 255, 136, 0.1); border: 1px solid #00ff88; color: #00ff88; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 20px; font-family: 'Courier New', monospace;">
                      ● NEW INQUIRY
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 12px 30px; background-color: #0c0c14; border-bottom: 1px solid #1e293b; font-size: 12px; color: #64748b; font-family: 'Courier New', monospace;">
              📅 <strong>Timestamp:</strong> ${dateStr} IST
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">
              
              <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #12121c; border: 1px solid #1e293b; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #1e293b;">
                    <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-family: 'Courier New', monospace; font-weight: 750;">Sender Name</div>
                    <div style="font-size: 16px; color: #f8fafc; font-weight: 600; margin-top: 4px;">${name}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #1e293b;">
                    <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-family: 'Courier New', monospace; font-weight: 750;">Email Address</div>
                    <div style="font-size: 15px; margin-top: 4px;">
                      <a href="mailto:${email}" style="color: #00d4ff; text-decoration: none; font-weight: 500;">${email}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-family: 'Courier New', monospace; font-weight: 750;">Subject</div>
                    <div style="font-size: 15px; color: #00ff88; font-weight: 600; margin-top: 4px;">${subject || 'General Inquiry'}</div>
                  </td>
                </tr>
              </table>

              <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-family: 'Courier New', monospace; margin-bottom: 8px; font-weight: 700;">
                💬 Message Payload:
              </div>
              <div style="background-color: #141420; border-left: 4px solid #00ff88; border-top: 1px solid #1e293b; border-right: 1px solid #1e293b; border-bottom: 1px solid #1e293b; border-radius: 6px; padding: 20px; color: #e2e8f0; font-size: 14.5px; line-height: 1.7; white-space: pre-wrap;">${message}</div>

              <table width="100%" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #060609; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 32px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);">
                      ✉️ Direct Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="padding: 20px 30px; background-color: #0a0a10; border-top: 1px solid #1e293b; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b; font-family: 'Courier New', monospace;">
                🔒 Secured via Resend API • Akshay Portfolio Gateway
              </p>
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  try {
    const emailHTML = generateEmailHTML({ name, email, subject, message });

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'akshaysati1207@gmail.com',
      reply_to: email,
      subject: `⚡ [Portfolio Message] ${subject || 'New Contact'} - ${name}`,
      html: emailHTML
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
