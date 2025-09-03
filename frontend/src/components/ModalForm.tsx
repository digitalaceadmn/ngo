"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// =================== TYPES ===================
type FieldType = "text" | "email" | "number" | "date" | "textarea" | "select" | "checkbox";

interface Field {
    label: string;
    type: FieldType;
    required?: boolean;
    options?: string[];
}

interface Step {
    title: string;
    fields: Field[];
}

type FormType = "doctor" | "ngo" | "support";

interface ModalFormProps {
    type: FormType;
    onClose: () => void;
}

// =================== FORM CONFIG ===================
const stepsConfig: Record<FormType, Step[]> = {
    doctor: [
        {
            title: "Personal Information",
            fields: [
                { label: "Full Name", type: "text", required: true },
                { label: "Date of Birth", type: "date" },
                { label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
                { label: "Mobile Number", type: "text", required: true },
                { label: "Email ID", type: "email", required: true },
                { label: "Address", type: "textarea" },
            ],
        },
        {
            title: "Professional Information",
            fields: [
                { label: "Medical Registration No.", type: "text", required: true },
                { label: "Qualification", type: "select", options: ["MBBS", "MD", "DM", "DNB", "Other"] },
                { label: "Specialization", type: "text" },
                { label: "Years of Experience", type: "number" },
                { label: "Current Hospital/Clinic", type: "text" },
                { label: "Location – City/State", type: "text" },
            ],
        },
        {
            title: "Commitment",
            fields: [
                { label: "Preferred Mode of Consultation", type: "select", options: ["In-person", "Teleconsultation", "Both"] },
                { label: "Languages Spoken", type: "text" },
                {
                    label: "Areas of Interest",
                    type: "checkbox",
                    options: [
                        "Oncology Awareness",
                        "Rare Diseases",
                        "Preventive Health",
                        "Medical Education",
                        "Research & Publications",
                        "Rural Outreach Programs",
                    ],
                },
            ],
        },
    ],

    ngo: [
        {
            title: "Organization Details",
            fields: [
                { label: "NGO Name", type: "text", required: true },
                { label: "Registration Number", type: "text" },
                { label: "Date of Registration", type: "date" },
                { label: "Registered Address", type: "textarea" },
                { label: "Website / Social Media", type: "text" },
            ],
        },
        {
            title: "Contact Person",
            fields: [
                { label: "Full Name", type: "text", required: true },
                { label: "Designation", type: "text" },
                { label: "Email", type: "email", required: true },
                { label: "Mobile Number", type: "text", required: true },
            ],
        },
        {
            title: "Partnership",
            fields: [
                { label: "Why do you want to partner?", type: "textarea" },
                {
                    label: "Pillars",
                    type: "checkbox",
                    options: ["Awareness", "Guided Consultation", "Learning & Training", "Community & Youth Engagement"],
                },
                {
                    label: "Support",
                    type: "checkbox",
                    options: ["Volunteer Network", "Awareness Campaigns", "Healthcare Camps", "Digital/Media Support", "Other"],
                },
            ],
        },
    ],

    support: [
        {
            title: "Basic Details",
            fields: [
                { label: "Full Name / Organization", type: "text", required: true },
                { label: "Type", type: "select", options: ["Individual", "NGO", "Doctor", "Student", "Corporate / CSR", "Other"] },
                { label: "Contact Number", type: "text", required: true },
                { label: "Email", type: "email", required: true },
                { label: "Address / City", type: "text" },
            ],
        },
        {
            title: "Support Type",
            fields: [
                {
                    label: "Ways to Support",
                    type: "checkbox",
                    options: ["Financial Contribution", "Awareness Campaigns", "Volunteering", "Affordable Medicine Access", "Digital Support", "Other"],
                },
            ],
        },
        {
            title: "Commitment",
            fields: [
                { label: "Frequency", type: "select", options: ["One-time", "Monthly", "Yearly", "Project-based"] },
                { label: "Approx Contribution", type: "number" },
                { label: "Skills / Resources", type: "textarea" },
                { label: "Why Prankiran?", type: "textarea" },
            ],
        },
    ],
};

// =================== MODAL FORM ===================
const ModalForm = ({ type, onClose }: ModalFormProps) => {
    const [step, setStep] = useState<number>(0);
    const steps = stepsConfig[type];

    // Track all field values
    const [formData, setFormData] = useState<Record<string, any>>({});

    const progressPercent = ((step + 1) / steps.length) * 100;

    // Handle input change
    const handleChange = (label: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [label]: value,
        }));
    };

    // Handle checkbox change (multiple values)
    const handleCheckboxChange = (label: string, option: string, checked: boolean) => {
        setFormData((prev) => {
            const arr = prev[label] || [];
            if (checked) {
                return { ...prev, [label]: [...arr, option] };
            } else {
                return { ...prev, [label]: arr.filter((v: string) => v !== option) };
            }
        });
    };

    // Submit handler
    const handleSubmit = async () => {
        let res;
        if (type === "doctor") {
            // Map frontend labels to backend field names
            const mappedData = {
                full_name: formData["Full Name"],
                date_of_birth: formData["Date of Birth"],
                gender: formData["Gender"],
                mobile_number: formData["Mobile Number"],
                email: formData["Email ID"],
                address: formData["Address"],
                medical_registration_no: formData["Medical Registration No."],
                qualification: formData["Qualification"],
                specialization: formData["Specialization"],
                years_of_experience: formData["Years of Experience"],
                current_hospital_clinic: formData["Current Hospital/Clinic"],
                location_city_state: formData["Location – City/State"],
                areas_of_interest: formData["Areas of Interest"],
                languages_spoken: formData["Languages Spoken"],
                preferred_mode_of_consultation: formData["Preferred Mode of Consultation"],
                // Add other fields as needed
            };

            res = await submitDoctorApplication(mappedData);
        } else if (type === "ngo") {
            // Example mapping for NGOApplication
            const ngoData = {
                ngo_name: formData["NGO Name"],
                registration_number: formData["Registration Number"],
                date_of_registration: formData["Date of Registration"],
                registered_address: formData["Registered Address"],
                website_social: formData["Website / Social Media"], // fix label to match your form
                contact_full_name: formData["Full Name"],           // <-- fix here
                contact_designation: formData["Designation"],       // <-- fix here
                contact_email: formData["Email"],                   // <-- fix here
                contact_mobile: formData["Mobile Number"],          // <-- fix here
                partnership_reason: formData["Why do you want to partner?"],
                pillars: formData["Pillars"],
                support: formData["Support"],
            };
            res = await submitNGOApplication(ngoData);
        } else if (type === "support") {
            // Example mapping for SupportApplication
            const supportData = {
                name_or_org: formData["Full Name / Organization"],
                type: formData["Type"],
                contact_number: formData["Contact Number"],
                email: formData["Email"],
                address_city: formData["Address / City"],
                ways_to_support: formData["Ways to Support"], // should be an array
                frequency: formData["Frequency"],
                approx_contribution: formData["Approx Contribution"],
                skills_resources: formData["Skills / Resources"],
                reason_for_prankiran: formData["Why Prankiran?"],
            };
            res = await submitSupportApplication(supportData);
        }
        // Optionally show success/error message here
        onClose();
    };

    return (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.7)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <motion.div
                    className="modal-content p-4 rounded-4"
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="modal-header border-0 flex-column align-items-start">
                        <h5 className="modal-title w-100">{steps[step].title}</h5>

                        {/* Progress Bar */}
                        <div className="w-100 mt-3">
                            <div className="progress" style={{ height: "8px" }}>
                                <motion.div
                                    className="progress-bar bg-primary"
                                    style={{ width: `${progressPercent}%` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 0.4 }}
                                ></motion.div>
                            </div>
                        </div>

                        {/* Step Indicators */}
                        <div className="d-flex justify-content-between w-100 mt-2">
                            {steps.map((s, idx) => (
                                <div key={idx} className="text-center flex-fill">
                                    <div
                                        className={`rounded-circle mx-auto mb-1 ${
                                            idx <= step ? "bg-primary text-white" : "bg-light text-muted"
                                        }`}
                                        style={{
                                            width: "28px",
                                            height: "28px",
                                            lineHeight: "28px",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {idx + 1}
                                    </div>
                                    <small className={idx === step ? "fw-bold text-dark" : "text-muted"}>{s.title}</small>
                                </div>
                            ))}
                        </div>

                        <button className="btn-close position-absolute top-0 end-0 mt-3 me-3" onClick={onClose}></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        {steps[step].fields.map((field: Field, i: number) => (
                            <div className="mb-3" key={i}>
                                <label className="form-label">{field.label}</label>
                                {field.type === "text" ||
                                field.type === "email" ||
                                field.type === "number" ||
                                field.type === "date" ? (
                                    <input
                                        type={field.type}
                                        className="form-control"
                                        required={field.required}
                                        value={formData[field.label] || ""}
                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                    />
                                ) : field.type === "textarea" ? (
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={formData[field.label] || ""}
                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                    ></textarea>
                                ) : field.type === "select" ? (
                                    <select
                                        className="form-select"
                                        value={formData[field.label] || ""}
                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {field.options?.map((opt: string, idx: number) => (
                                            <option key={idx} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : field.type === "checkbox" ? (
                                    field.options?.map((opt: string, idx: number) => (
                                        <div className="form-check" key={idx}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`${field.label}-${idx}`}
                                                checked={formData[field.label]?.includes(opt) || false}
                                                onChange={(e) =>
                                                    handleCheckboxChange(field.label, opt, e.target.checked)
                                                }
                                            />
                                            <label className="form-check-label">{opt}</label>
                                        </div>
                                    ))
                                ) : null}
                            </div>
                        ))}
                    </div>

                    {/* Footer Navigation */}
                    <div className="modal-footer border-0">
                        {step > 0 && (
                            <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                                Back
                            </button>
                        )}
                        {step < steps.length - 1 ? (
                            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                                Next
                            </button>
                        ) : (
                            <button className="btn btn-success" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Example function to submit Doctor Application
async function submitDoctorApplication(data: any) {
    const response = await fetch("http://localhost:8000/api/doctor-application/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

// Example function to submit NGO Application
async function submitNGOApplication(data: any) {
    const response = await fetch("http://localhost:8000/api/ngo-application/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

// Example function to submit Support Application
async function submitSupportApplication(data: any) {
    const response = await fetch("http://localhost:8000/api/support-application/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export default ModalForm;
