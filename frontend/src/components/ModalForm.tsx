"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DoctorApplication from "@/pojo/DoctorApplication";
import NGOApplication from "@/pojo/NGOApplication";
import SupportApplication from "@/pojo/SupportApplication";

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

const ModalForm = ({ type, onClose }: ModalFormProps) => {
    const [step, setStep] = useState<number>(0);
    const steps = stepsConfig[type];
    const [domain , setDomain] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const domain = window.location.hostname;
            setDomain(domain);
        }
    }, []);

    const [formData, setFormData] = useState<Record<string, string | number | string[] | undefined>>({});

    const progressPercent = ((step + 1) / steps.length) * 100;

    const handleChange = (label: string, value: string | number | string[]) => {
        setFormData((prev) => ({
            ...prev,
            [label]: value,
        }));
    };

    const handleCheckboxChange = (label: string, option: string, checked: boolean) => {
        setFormData((prev) => {
            const arr = Array.isArray(prev[label]) ? prev[label] as string[] : [];
            if (checked) {
                return { ...prev, [label]: [...arr, option] };
            } else {
                return { ...prev, [label]: arr.filter((v: string) => v !== option) };
            }
        });
    };

    const handleSubmit = async () => {
        let res;
        if (type === "doctor") {
            const mappedData: DoctorApplication = {
                full_name: String(formData["Full Name"] ?? ""),
                date_of_birth: formData["Date of Birth"] ? String(formData["Date of Birth"]) : undefined,
                gender: formData["Gender"] ? String(formData["Gender"]) : undefined,
                mobile_number: String(formData["Mobile Number"] ?? ""),
                email: String(formData["Email ID"] ?? ""),
                address: formData["Address"] ? String(formData["Address"]) : undefined,
                medical_registration_no: String(formData["Medical Registration No."] ?? ""),
                qualification: formData["Qualification"] ? String(formData["Qualification"]) : undefined,
                specialization: formData["Specialization"] ? String(formData["Specialization"]) : undefined,
                years_of_experience: formData["Years of Experience"] !== undefined && formData["Years of Experience"] !== "" ? Number(formData["Years of Experience"]) : undefined,
                current_hospital_clinic: formData["Current Hospital/Clinic"] ? String(formData["Current Hospital/Clinic"]) : undefined,
                location_city_state: formData["Location – City/State"] ? String(formData["Location – City/State"]) : undefined,
                areas_of_interest: Array.isArray(formData["Areas of Interest"]) ? formData["Areas of Interest"] as string[] : undefined,
                languages_spoken: formData["Languages Spoken"] ? String(formData["Languages Spoken"]) : undefined,
                preferred_mode_of_consultation: formData["Preferred Mode of Consultation"] ? String(formData["Preferred Mode of Consultation"]) : undefined,
            };

            res = await submitDoctorApplication(mappedData , domain);
        } else if (type === "ngo") {
            const ngoData: NGOApplication = {
                ngo_name: String(formData["NGO Name"] ?? ""),
                registration_number: formData["Registration Number"] ? String(formData["Registration Number"]) : undefined,
                date_of_registration: formData["Date of Registration"] ? String(formData["Date of Registration"]) : undefined,
                registered_address: formData["Registered Address"] ? String(formData["Registered Address"]) : undefined,
                website_social: formData["Website / Social Media"] ? String(formData["Website / Social Media"]) : undefined,
                contact_full_name: String(formData["Full Name"] ?? ""),
                contact_designation: formData["Designation"] ? String(formData["Designation"]) : undefined,
                contact_email: String(formData["Email"] ?? ""),
                contact_mobile: String(formData["Mobile Number"] ?? ""),
                partnership_reason: formData["Why do you want to partner?"] ? String(formData["Why do you want to partner?"]) : undefined,
                pillars: Array.isArray(formData["Pillars"]) ? formData["Pillars"] as string[] : undefined,
                support: Array.isArray(formData["Support"]) ? formData["Support"] as string[] : undefined,
            };
            res = await submitNGOApplication(ngoData , domain);
        } else if (type === "support") {
            const supportData: SupportApplication = {
                name_or_org: String(formData["Full Name / Organization"] ?? ""),
                type: String(formData["Type"] ?? ""),
                contact_number: String(formData["Contact Number"] ?? ""),
                email: String(formData["Email"] ?? ""),
                address_city: formData["Address / City"] ? String(formData["Address / City"]) : undefined,
                ways_to_support: Array.isArray(formData["Ways to Support"]) ? formData["Ways to Support"] as string[] : undefined,
                frequency: formData["Frequency"] ? String(formData["Frequency"]) : undefined,
                approx_contribution: formData["Approx Contribution"] !== undefined && formData["Approx Contribution"] !== "" ? Number(formData["Approx Contribution"]) : undefined,
                skills_resources: formData["Skills / Resources"] ? String(formData["Skills / Resources"]) : undefined,
                reason_for_prankiran: formData["Why Prankiran?"] ? String(formData["Why Prankiran?"]) : undefined,
            };
            res = await submitSupportApplication(supportData , domain);
        }
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
                    <div className="modal-header border-0 flex-column align-items-start">
                        <h5 className="modal-title w-100">{steps[step].title}</h5>

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

                        <div className="d-flex justify-content-between w-100 mt-2">
                            {steps.map((s, idx) => (
                                <div key={idx} className="text-center flex-fill">
                                    <div
                                        className={`rounded-circle mx-auto mb-1 ${idx <= step ? "bg-primary text-white" : "bg-light text-muted"
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
                                                checked={Array.isArray(formData[field.label]) ? (formData[field.label] as string[]).includes(opt) : false}
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

async function submitDoctorApplication(data: DoctorApplication, domain: string) {
    const response = await fetch(`https://${domain}/api/doctor-application/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function submitNGOApplication(data: NGOApplication, domain: string) {
    const response = await fetch(`https://${domain}/api/ngo-application/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function submitSupportApplication(data: SupportApplication, domain: string) {
    const response = await fetch(`https://${domain}/api/support-application/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export default ModalForm;
