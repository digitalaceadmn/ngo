from django.core.management.base import BaseCommand
from api.emails import send_admin_email, send_user_email
from api.utils import run_in_background, send_mailtrap_email



class Command(BaseCommand):
    help = "Test Mailtrap email sending and background thread"

    def handle(self, *args, **options):
        print("Testing send_mailtrap_email in background...")
        try:
            run_in_background(
                send_mailtrap_email,
                to_email="kundan.softech@gmail.com",
                subject="Mailtrap Test Subject",
                text="This is a test email sent via Mailtrap API.",
                from_email="hello@digitalace.in",
                from_name="Prankiran- Ray of Vitality",
                category="Integration Test"
            )
            print("Started background thread for Mailtrap email.")
        except Exception as e:
            print(f"Exception in run_in_background/send_mailtrap_email: {e}")