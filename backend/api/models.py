from tabnanny import verbose
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
    gender = models.CharField(
        max_length=10, choices=GENDER_CHOICES, null=True, blank=True
    )
    mobile_number = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField(blank=True)

    medical_registration_no = models.CharField(max_length=100)
    qualification = models.CharField(
        max_length=50, choices=DOCTOR_QUALIFICATION_CHOICES, null=True, blank=True
    )
    specialization = models.CharField(max_length=255, blank=True)
    years_of_experience = models.IntegerField(null=True, blank=True)
    current_hospital = models.CharField(max_length=255, blank=True)
    location_city_state = models.CharField(max_length=255, blank=True)

    preferred_consultation_mode = models.CharField(
        max_length=50, choices=CONSULTATION_CHOICES, null=True, blank=True
    )
    languages_spoken = models.CharField(max_length=255, blank=True)
    areas_of_interest = models.JSONField(
        blank=True, null=True
    )  # store checkboxes as list

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
    frequency = models.CharField(
        max_length=50, choices=SUPPORT_TYPE_CHOICES, null=True, blank=True
    )
    approx_contribution = models.DecimalField(
        max_digits=12, decimal_places=2, null=True, blank=True
    )
    skills_resources = models.TextField(blank=True)
    reason_for_prankiran = models.TextField(blank=True)

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name_or_org


class Student(models.Model):
    # Tab 1: Personal Details
    full_name = models.CharField(max_length=150)
    gender = models.CharField(
        max_length=10,
        choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")],
    )
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, help_text="Preferably WhatsApp")
    parent_guardian_name = models.CharField(max_length=150)
    parent_guardian_contact = models.CharField(max_length=15)
    residential_address = models.TextField()
    is_rural = models.BooleanField(default=False)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100, blank=True, null=True)
    village = models.CharField(max_length=100, blank=True, null=True)
    preferred_language = models.CharField(
        max_length=50,
        choices=[
            ("English", "English"),
            ("Hindi", "Hindi"),
            ("Other", "Other"),
        ],
        default="Hindi",
    )

    # Tab 2: Education Details
    education_level = models.CharField(
        max_length=50,
        choices=[
            ("10th Appearing", "10th Appearing"),
            ("10th Passed", "10th Passed"),
            ("12th Appearing", "12th Appearing"),
            ("12th Passed", "12th Passed"),
            ("Graduation in Progress", "Graduation in Progress"),
        ],
    )
    school_college_name = models.CharField(max_length=200)
    board_university = models.CharField(max_length=200, blank=True, null=True)
    stream = models.CharField(
        max_length=50,
        choices=[("Science", "Science"), ("Other", "Other")],
        default="Science",
    )
    subjects_studied = models.TextField(help_text="List subjects like PCM, PCB, etc.")
    academic_performance = models.CharField(max_length=50, help_text="Last % or grades")
    career_goal = models.CharField(
        max_length=50,
        choices=[
            ("MBBS", "MBBS"),
            ("BDS", "BDS"),
            ("Nursing", "Nursing"),
            ("Paramedical", "Paramedical"),
            ("Allied Health Sciences", "Allied Health Sciences"),
            ("Not Decided", "Not Decided"),
        ],
    )

    # Tab 3: Preferences
    wants_neet_classes = models.BooleanField(default=False)
    needs_books = models.BooleanField(default=False)
    wants_journals = models.BooleanField(default=False)
    wants_mentorship = models.BooleanField(default=False)
    wants_volunteering = models.BooleanField(default=False)
    other_preferences = models.TextField(blank=True, null=True)

    why_consider_you = models.TextField(blank=True, null=True)

    # Consent
    consent_given = models.BooleanField(default=False)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.education_level})"

    class Meta:
        verbose_name = "StudentApplication"
        verbose_name_plural = "StudentApplication"
