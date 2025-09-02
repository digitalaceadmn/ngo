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

    const progressPercent = ((step + 1) / steps.length) * 100;

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
                                    <input type={field.type} className="form-control" required={field.required} />
                                ) : field.type === "textarea" ? (
                                    <textarea className="form-control" rows={3}></textarea>
                                ) : field.type === "select" ? (
                                    <select className="form-select">
                                        {field.options?.map((opt: string, idx: number) => (
                                            <option key={idx}>{opt}</option>
                                        ))}
                                    </select>
                                ) : field.type === "checkbox" ? (
                                    field.options?.map((opt: string, idx: number) => (
                                        <div className="form-check" key={idx}>
                                            <input type="checkbox" className="form-check-input" id={`${field.label}-${idx}`} />
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
                            <button className="btn btn-success" onClick={onClose}>
                                Submit
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ModalForm;
