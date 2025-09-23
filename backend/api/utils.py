import threading
import requests
from django.conf import settings

import logging


logger = logging.getLogger(__name__)

def run_in_background(func, *args, **kwargs):
    thread = threading.Thread(target=func, args=args, kwargs=kwargs)
    thread.start()
    print(f"Started background thread ")



def send_mailtrap_email(
    to_email: str,
    subject: str,
    text: str = None,
    from_email: str = "no-reply@prankiran.org",
    from_name: str = "Prankiran- Ray of Vitality",
    category: str = "Integration Test"
) -> dict:
    """
    Send an email using the Mailtrap API.
    
    Args:
        to_email (str): Recipient email address
        subject (str): Email subject line
        text (str, optional): Email body text. Defaults to None.
        from_email (str, optional): Sender email address. Defaults to "no-reply@prankiran.org".
        from_name (str, optional): Sender name. Defaults to "Mailtrap Test".
        category (str, optional): Email category. Defaults to "Integration Test".
    
    Returns:
        dict: API response from Mailtrap
    """
    try:
        url = "https://send.api.mailtrap.io/api/send"
        
        headers = {
            "Authorization": f"Bearer {settings.MAILTRAP_API_TOKEN}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "from": {
                "email": from_email,
                "name": from_name
            },
            "to": [
                {
                    "email": to_email
                },  
            ],
            "subject": subject,
            "text": text or f"Email from {from_name}",
            "category": category
        }
        
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        return {
            "success": True,
            "response": response.json()
        }
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Mailtrap API error: {str(e)}")
        print("############################")
        return {
            "success": False,
            "error": str(e)
        }