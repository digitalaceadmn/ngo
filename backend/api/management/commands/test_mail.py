# from django.core.management.base import BaseCommand
# from api.emails import send_admin_email, send_user_email
# from api.utils import run_in_background, send_mailtrap_email



# class Command(BaseCommand):
#     help = "Test Mailtrap email sending and background thread"

#     def handle(self, *args, **options):
#         print("Testing send_mailtrap_email in background...")
#         try:
#             run_in_background(
#                 send_mailtrap_email,
#                 to_email="kundan.softech@gmail.com",
#                 subject="Mailtrap Test Subject",
#                 text="This is a test email sent via Mailtrap API.",
#                 from_email="hello@digitalace.in",
#                 from_name="Prankiran- Ray of Vitality",
#                 category="Integration Test"
#             )
#             print("Started background thread for Mailtrap email.")
#         except Exception as e:
#             print(f"Exception in run_in_background/send_mailtrap_email: {e}")


from django.core.management.base import BaseCommand
from api.emails import send_admin_email, send_user_email

class Command(BaseCommand):
    help = "Test send_admin_email and send_user_email functions"

    def handle(self, *args, **options):
        test_data = {
            "full_name": "Test User",
            "email": "kundan.softech@gmail.com",
            "other_field": "Sample value"
        }

        print("Testing send_admin_email...")
        try:
            send_admin_email("Doctor", test_data)
            print("send_admin_email called (check logs for errors).")
        except Exception as e:
            print(f"Exception in send_admin_email: {e}")

        print("Testing send_user_email...")
        try:
            send_user_email("kundan.softech@gmail.com", "Doctor", test_data)
            print("send_user_email called (check logs for errors).")
        except Exception as e:
            print(f"Exception in send_user_email: {e}")