from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


def send_admin_email(application_type, data):
    subject = f"New {application_type} Application Submitted"
    from_email = settings.DISPLAY_NAME
    to = [settings.SEND_TO_EMAIL]

    html_content = render_to_string("emails/admin_notification.html", {"data": data})
    msg = EmailMultiAlternatives(subject, "", from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()


def send_user_email(user_email, application_type, data):
    subject = f"Thank You for Your {application_type} Application"
    from_email = settings.DISPLAY_NAME
    to = [user_email]

    html_content = render_to_string("emails/user_thankyou.html", {"data": data})
    msg = EmailMultiAlternatives(subject, "", from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()
