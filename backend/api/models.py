from django.db import models


# Choices
GENDER_CHOICES = [
    ("Male", "Male"),
    ("Female", "Female"),
    ("Other", "Other"),
]

DOCTOR_QUALIFICATION_CHOICES = [
    ("MBBS", "MBBS"),
    ("MD", "MD"),
    ("DM", "DM"),
    ("DNB", "DNB"),
    ("Other", "Other"),
]

CONSULTATION_CHOICES = [
    ("In-person", "In-person"),
    ("Teleconsultation", "Teleconsultation"),
    ("Both", "Both"),
]

SUPPORT_TYPE_CHOICES = [
    ("One-time", "One-time"),
    ("Monthly", "Monthly"),
    ("Yearly", "Yearly"),
    ("Project-based", "Project-based"),
]

PARTNER_PILLARS_CHOICES = [
    ("Awareness", "Awareness"),
    ("Guided Consultation", "Guided Consultation"),
    ("Learning & Training", "Learning & Training"),
    ("Community & Youth Engagement", "Community & Youth Engagement"),
]

SUPPORT_CHOICES = [
    ("Volunteer Network", "Volunteer Network"),
    ("Awareness Campaigns", "Awareness Campaigns"),
    ("Healthcare Camps", "Healthcare Camps"),
    ("Digital/Media Support", "Digital/Media Support"),
    ("Other", "Other"),
]

WAYS_TO_SUPPORT_CHOICES = [
    ("Financial Contribution", "Financial Contribution"),
    ("Awareness Campaigns", "Awareness Campaigns"),
    ("Volunteering", "Volunteering"),
    ("Affordable Medicine Access", "Affordable Medicine Access"),
    ("Digital Support", "Digital Support"),
    ("Other", "Other"),
]

TYPE_CHOICES = [
    ("Individual", "Individual"),
    ("NGO", "NGO"),
    ("Doctor", "Doctor"),
    ("Student", "Student"),
    ("Corporate / CSR", "Corporate / CSR"),
    ("Other", "Other"),
]

# =================== MODELS ===================
class DoctorApplication(models.Model):
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    mobile_number = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField(blank=True)

    medical_registration_no = models.CharField(max_length=100)
    qualification = models.CharField(max_length=50, choices=DOCTOR_QUALIFICATION_CHOICES, null=True, blank=True)
    specialization = models.CharField(max_length=255, blank=True)
    years_of_experience = models.IntegerField(null=True, blank=True)
    current_hospital = models.CharField(max_length=255, blank=True)
    location_city_state = models.CharField(max_length=255, blank=True)

    preferred_consultation_mode = models.CharField(max_length=50, choices=CONSULTATION_CHOICES, null=True, blank=True)
    languages_spoken = models.CharField(max_length=255, blank=True)
    areas_of_interest = models.JSONField(blank=True, null=True)  # store checkboxes as list

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class NGOApplication(models.Model):
    ngo_name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, blank=True)
    date_of_registration = models.DateField(null=True, blank=True)
    registered_address = models.TextField(blank=True)
    website_social = models.CharField(max_length=255, blank=True)

    contact_full_name = models.CharField(max_length=255)
    contact_designation = models.CharField(max_length=100, blank=True)
    contact_email = models.EmailField()
    contact_mobile = models.CharField(max_length=20)

    partnership_reason = models.TextField(blank=True)
    pillars = models.JSONField(blank=True, null=True)  # store selected pillars as list
    support = models.JSONField(blank=True, null=True)  # store selected support as list

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ngo_name


class SupportApplication(models.Model):
    name_or_org = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, null=True, blank=True)
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()
    address_city = models.CharField(max_length=255, blank=True)

    ways_to_support = models.JSONField(blank=True, null=True)
    frequency = models.CharField(max_length=50, choices=SUPPORT_TYPE_CHOICES, null=True, blank=True)
    approx_contribution = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    skills_resources = models.TextField(blank=True)
    reason_for_prankiran = models.TextField(blank=True)

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name_or_org
