from django.conf import settings
from api.utils import run_in_background, send_mailtrap_email


def generate_email_html(application_type, data):
    logo_url = "https://prankiran.org/_next/static/media/logo-t.1e610dfe.png"  # replace with actual logo URL
    rows = "".join(
        f"""
        <tr>
            <td style="padding:6px 12px;border:1px solid #ddd;font-size:14px;">
                <strong>{key.replace('_', ' ').title()}</strong>
            </td>
            <td style="padding:6px 12px;border:1px solid #ddd;font-size:14px;">
                {value if value else '-'}
            </td>
        </tr>
        """
        for key, value in data.items()
    )

    return f"""
    <html>
    <body style="font-family:Arial, sans-serif;background-color:#f8f8f8;margin:0;padding:20px;">
        <table align="center" cellpadding="0" cellspacing="0" width="600" 
               style="background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden;">
            <tr style="background-color:#222;">
                <td align="center" style="padding:20px;">
                    <img src="{logo_url}" alt="Prankiran" style="max-width:220px;">
                </td>
            </tr>
            <tr>
                <td style="padding:20px 30px;">
                    <h2 style="color:#444;margin:0 0 15px;font-size:20px;">
                        New {application_type} Application
                    </h2>
                    <p style="color:#666;font-size:14px;margin:0 0 20px;">
                        Below are the details submitted:
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        {rows}
                    </table>
                </td>
            </tr>
            <tr>
                <td style="background:#222;padding:15px;text-align:center;color:#fff;font-size:12px;">
                    © {2025} Prankiran | Ray of Vitality
                </td>
            </tr>
        </table>
    </body>
    </html>
    """


def send_admin_email(application_type, data):
    subject = f"New {application_type} Application Submitted"
    to_email="kundan.softech@gmail.com"
    text = f"New {application_type} application submitted.\n\nDetails:\n{data}"
    html = generate_email_html(application_type, data)

    try:
        run_in_background(
            send_mailtrap_email,
            to_email=to_email,
            subject=subject,
            text=text,
            html=html,
            from_email="hello@digitalace.in",
            from_name="Admin Notification",
            category="Admin"
        )
    except Exception as e:
        print(f"Error sending admin email: {e}")

def generate_user_email_html(application_type, data):
    """
    Friendly, mobile-friendly HTML email for users after they submit an application.
    `data` is a dict of submitted values (e.g. {"name": "Kundan", "email": "...", ...})
    """
    logo_url = "https://prankiran.org/_next/static/media/logo-t.1e610dfe.png"
    user_name = data.get("name") or data.get("full_name") or data.get("applicant_name") or ""

    def safe_val(v):
        if v is None:
            return "-"
        s = str(v)
        return s if len(s) <= 500 else (s[:497] + "...")

    rows = "".join(
        f"""
        <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:14px;color:#333;width:35%;">
                <strong>{key.replace('_', ' ').title()}</strong>
            </td>
            <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:14px;color:#555;">
                {safe_val(value)}
            </td>
        </tr>
        """
        for key, value in data.items()
    )

    year = datetime.utcnow().year
    support_email = "hello@digitalace.in"

    return f"""
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif;background-color:#f4f6f8;margin:0;padding:24px;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;">
        <tr>
          <td style="padding:18px 0;text-align:center;">
            <img src="{logo_url}" alt="Prankiran" style="max-width:180px;height:auto;">
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;border-radius:8px;padding:22px;box-shadow:0 6px 18px rgba(0,0,0,0.06);">
            <h1 style="font-size:20px;color:#111;margin:0 0 8px;">
              Thank you{f', {user_name}' if user_name else ''}!
            </h1>
            <p style="margin:0 0 18px;color:#556;line-height:1.5;">
              We have received your <strong>{application_type}</strong> application. Below is a copy of the details you submitted.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border-radius:6px;overflow:hidden;">
              {rows}
            </table>

            <p style="margin:18px 0 22px;color:#556;line-height:1.5;">
              Our team will review your submission and get back to you shortly. If you need immediate assistance, reply to this email or contact us at <a href="mailto:{support_email}" style="color:#1a73e8;text-decoration:none;">{support_email}</a>.
            </p>

            <!-- CTA -->
            <p style="text-align:center;margin:0 0 6px;">
              <a href="#" style="display:inline-block;padding:12px 20px;border-radius:6px;text-decoration:none;background:#1a73e8;color:#fff;font-weight:600;">
                View Your Application
              </a>
            </p>

            <p style="margin:16px 0 0;color:#9aa0a6;font-size:13px;">
              This is an automated message — please do not reply to this address. For support, contact {support_email}.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:12px 0;text-align:center;font-size:12px;color:#9aa0a6;">
            © {year} Prankiran | Ray of Vitality
          </td>
        </tr>
      </table>
    </body>
    </html>
    """


def send_user_email(user_email, application_type, data):

    subject = f"Thank you — we received your {application_type} application"
    text_parts = [f"Thank you for submitting your {application_type} application."]
    text_parts.append("\nDetails:\n")
    for k, v in data.items():
        text_parts.append(f"{k.replace('_', ' ').title()}: {v if v is not None else '-'}")
    text = "\n".join(text_parts)

    html = generate_user_email_html(application_type, data)

    try:
        run_in_background(
            send_mailtrap_email,
            to_email=user_email,
            subject=subject,
            text=text,
            html=html,  
            from_email="hello@digitalace.in",
            from_name="Support Team",
            category="User"
        )
    except Exception as e:
        print(f"Error sending user email: {e}")