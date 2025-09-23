from django.conf import settings
from api.utils import run_in_background, send_mailtrap_email

def send_admin_email(application_type, data):
    subject = f"New {application_type} Application Submitted"
    to_email = settings.SEND_TO_EMAIL if isinstance(settings.SEND_TO_EMAIL, str) else settings.SEND_TO_EMAIL[0]
    text = f"New {application_type} application submitted.\n\nDetails:\n{data}"

    try:
        run_in_background(
            send_mailtrap_email,
            to_email=to_email,
            subject=subject,
            text=text,
            from_email=settings.DISPLAY_NAME,
            from_name="Admin Notification",
            category="Admin"
        )
    except Exception as e:
        print(f"Error sending admin email: {e}")

def send_user_email(user_email, application_type, data):
    subject = f"Thank You for Your {application_type} Application"
    text = f"Thank you for submitting your {application_type} application.\n\nDetails:\n{data}"

    try:
        run_in_background(
            send_mailtrap_email,
            to_email=user_email,
            subject=subject,
            text=text,
            from_email=settings.DISPLAY_NAME,
            from_name="Support Team",
            category="User"
        )
    except Exception as e:
        print(f"Error sending user email: {e}")