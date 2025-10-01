"use client";

import React, { useEffect, useState } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import Banner from "@/assets/images/contact-us-banner.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import {
    Phone,
    Email,
    Language,
    Place,
    LocalHospital,
    Groups,
    School,
    Favorite,
} from "@mui/icons-material";
import ModalForm from "@/components/ModalForm";

type FormType = "doctor" | "ngo" | "support";

export default function ContactPage() {
    const { setTitle } = useLayout();
    const [modalType, setModalType] = useState<FormType | null>(null);

    const [selected, setSelected] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [showStudentForm, setShowStudentForm] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        setTitle("Contact Us");
    }, [setTitle]);

    const handleCardClick = (label: string) => {
        setSelected(label);
    };

    const handleSubmit = () => {
        if (!selected) {
            alert("Please select a collaboration type first.");
            return;
        }
        if (selected === "Student") {
            setShowStudentForm(true);
            return;
        }
        let selection = '';
        if (selected === "Investor") {
            selection = "Support";
        } else if (selected === "Doctor") {
            selection = "Doctor";
        } else if (selected === "NGO") {
            selection = "NGO";
        }
        setModalType(selection?.toLowerCase() as FormType);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFinalSubmit = () => {
        console.log("Collaboration:", selected);
        console.log("User Info:", formData);
        setShowModal(false);
        alert("Thank you! We will connect with you soon.");
    };

    const [studentForm, setStudentForm] = useState({
        full_name: "",
        gender: "",
        date_of_birth: "",
        email: "",
        mobile_number: "",
        parent_guardian_name: "",
        parent_guardian_contact: "",
        residential_address: "",
        is_rural: false,
        state: "",
        district: "",
        village: "",
        preferred_language: "Hindi",
        education_level: "",
        school_college_name: "",
        board_university: "",
        stream: "Science",
        subjects_studied: "",
        academic_performance: "",
        career_goal: "",
        wants_neet_classes: false,
        needs_books: false,
        wants_journals: false,
        wants_mentorship: false,
        wants_volunteering: false,
        other_preferences: "",
        why_consider_you: "",
        consent_given: false,
    });

    const handleStudentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setStudentForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleStudentFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/student-application/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentForm),
            });
            if (response.ok) {
                alert("Student form submitted successfully!");
                setShowStudentForm(false);
                setStudentForm({
                    full_name: "",
                    gender: "",
                    date_of_birth: "",
                    email: "",
                    mobile_number: "",
                    parent_guardian_name: "",
                    parent_guardian_contact: "",
                    residential_address: "",
                    is_rural: false,
                    state: "",
                    district: "",
                    village: "",
                    preferred_language: "Hindi",
                    education_level: "",
                    school_college_name: "",
                    board_university: "",
                    stream: "Science",
                    subjects_studied: "",
                    academic_performance: "",
                    career_goal: "",
                    wants_neet_classes: false,
                    needs_books: false,
                    wants_journals: false,
                    wants_mentorship: false,
                    wants_volunteering: false,
                    other_preferences: "",
                    why_consider_you: "",
                    consent_given: false,
                });
            } else {
                const errorData = await response.json();
                alert("Submission failed: " + (errorData.detail || "Unknown error"));
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }   
    };

    return (
        <>
            {/* Banner */}
            <section
                className="position-relative d-flex align-items-center justify-content-center text-center text-white"
                style={{
                    height: "60vh",
                    backgroundImage: `url('${Banner.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "30px",
                }}
            >

            </section>

            {/* Contact Details */}
            <Container className="py-5">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="fw-bold display-4 mb-3"
                >
                    Contact Us
                </motion.h1>
                <Row className="text-center g-4">
                    <Col md={3}>
                        <motion.div whileHover={{ scale: 1.1 }} className="p-4 bg-light rounded shadow">
                            <Phone color="success" fontSize="large" />
                            <h5 className="fw-bold mt-2">Phone</h5>
                            <p className="text-muted">9768640067</p>
                        </motion.div>
                    </Col>
                    <Col md={3}>
                        <motion.div whileHover={{ scale: 1.1 }} className="p-4 bg-light rounded shadow">
                            <Email color="error" fontSize="large" />
                            <h5 className="fw-bold mt-2">Email</h5>
                            <p className="text-muted">connect@prankiran.com</p>
                        </motion.div>
                    </Col>
                    <Col md={3}>
                        <motion.div whileHover={{ scale: 1.1 }} className="p-4 bg-light rounded shadow">
                            <Language color="primary" fontSize="large" />
                            <h5 className="fw-bold mt-2">Website</h5>
                            <p className="text-muted">prankiran.org</p>
                        </motion.div>
                    </Col>
                    <Col md={3}>
                        <motion.div whileHover={{ scale: 1.1 }} className="p-4 bg-light rounded shadow">
                            <Place color="warning" fontSize="large" />
                            <h5 className="fw-bold mt-2">Address</h5>
                            <p className="text-muted">Mumbai, India</p>
                        </motion.div>
                    </Col>
                </Row>
            </Container>

            {/* Google Map */}
            <section className="mb-5">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="rounded shadow overflow-hidden"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609735835!2d72.74110120662236!3d19.082197839152428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a19a9f3e7%3A0xdeb6c7d2c4ed5b3b!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1693559359965!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </Container>
            </section>

            <section className="py-5 bg-light">
                <Container>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="fw-bold text-center mb-4"
                    >
                        Collaboration Form
                    </motion.h2>
                    <p className="text-center text-muted mb-4">
                        How do you want to collaborate?
                    </p>
                    <Row className="g-4 justify-content-center">
                        {[
                            { icon: <LocalHospital color="primary" fontSize="large" />, label: "Doctor" },
                            { icon: <Groups color="success" fontSize="large" />, label: "NGO" },
                            { icon: <School color="warning" fontSize="large" />, label: "Student" },
                            { icon: <Favorite color="error" fontSize="large" />, label: "Investor" },
                        ].map((item, idx) => (
                            <Col md={3} key={idx}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleCardClick(item.label)}
                                    className={`p-4 rounded shadow text-center h-100 cursor-pointer ${selected === item.label ? "bg-soft-golden text-white" : "bg-white"
                                        }`}
                                    style={{ cursor: "pointer" }}
                                >
                                    {item.icon}
                                    <h5 className="fw-bold mt-2">{item.label}</h5>
                                    {selected === item.label && (
                                        <p className="mt-2 small">Selected</p>
                                    )}
                                </motion.div>
                            </Col>
                        ))}
                    </Row>

                    <div className="text-center mt-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-primary px-5"
                            onClick={handleSubmit}
                        >
                            Submit Interest
                        </motion.button>
                    </div>
                </Container>
            </section>

            <AnimatePresence>{modalType && <ModalForm type={modalType} onClose={() => setModalType(null)} />}</AnimatePresence>


            {/* Modal for User Info */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Your Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Enter your name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                placeholder="Enter your email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleFormChange}
                                placeholder="Enter your phone number"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleFinalSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Student Registration Modal */}
            <Modal show={showStudentForm} onHide={() => { setShowStudentForm(false); setStep(1); }} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {step === 1 && "Personal Details"}
                        {step === 2 && "Education Details"}
                        {step === 3 && "Preferences"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleStudentFormSubmit}>
                        {step === 1 && (
                            <>
                                <Form.Group className="mb-2">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control name="full_name" value={studentForm.full_name} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select name="gender" value={studentForm.gender} onChange={handleStudentFormChange} required>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" name="date_of_birth" value={studentForm.date_of_birth} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={studentForm.email} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Mobile Number (Preferably WhatsApp)</Form.Label>
                                    <Form.Control name="mobile_number" value={studentForm.mobile_number} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Parent/Guardian Name</Form.Label>
                                    <Form.Control name="parent_guardian_name" value={studentForm.parent_guardian_name} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Parent/Guardian Contact</Form.Label>
                                    <Form.Control name="parent_guardian_contact" value={studentForm.parent_guardian_contact} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Residential Address</Form.Label>
                                    <Form.Control as="textarea" rows={2} name="residential_address" value={studentForm.residential_address} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Rural?"
                                        name="is_rural"
                                        checked={studentForm.is_rural}
                                        onChange={handleStudentFormChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control name="state" value={studentForm.state} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control name="district" value={studentForm.district} onChange={handleStudentFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Village</Form.Label>
                                    <Form.Control name="village" value={studentForm.village} onChange={handleStudentFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Preferred Language</Form.Label>
                                    <Form.Select name="preferred_language" value={studentForm.preferred_language} onChange={handleStudentFormChange}>
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <Form.Group className="mb-2">
                                    <Form.Label>Education Level</Form.Label>
                                    <Form.Select name="education_level" value={studentForm.education_level} onChange={handleStudentFormChange} required>
                                        <option value="">Select</option>
                                        <option value="10th Appearing">10th Appearing</option>
                                        <option value="10th Passed">10th Passed</option>
                                        <option value="12th Appearing">12th Appearing</option>
                                        <option value="12th Passed">12th Passed</option>
                                        <option value="Graduation in Progress">Graduation in Progress</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>School/College Name</Form.Label>
                                    <Form.Control name="school_college_name" value={studentForm.school_college_name} onChange={handleStudentFormChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Board/University</Form.Label>
                                    <Form.Control name="board_university" value={studentForm.board_university} onChange={handleStudentFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Stream</Form.Label>
                                    <Form.Select name="stream" value={studentForm.stream} onChange={handleStudentFormChange}>
                                        <option value="Science">Science</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Subjects Studied (e.g. PCM, PCB, etc.)</Form.Label>
                                    <Form.Control name="subjects_studied" value={studentForm.subjects_studied} onChange={handleStudentFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Academic Performance (Last % or grades)</Form.Label>
                                    <Form.Control name="academic_performance" value={studentForm.academic_performance} onChange={handleStudentFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Career Goal</Form.Label>
                                    <Form.Select name="career_goal" value={studentForm.career_goal} onChange={handleStudentFormChange} required>
                                        <option value="">Select</option>
                                        <option value="MBBS">MBBS</option>
                                        <option value="BDS">BDS</option>
                                        <option value="Nursing">Nursing</option>
                                        <option value="Paramedical">Paramedical</option>
                                        <option value="Allied Health Sciences">Allied Health Sciences</option>
                                        <option value="Not Decided">Not Decided</option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <Form.Group className="mb-2">
                                    <Form.Check
                                        type="checkbox"
                                        label="Wants NEET Classes"
                                        name="wants_neet_classes"
                                        checked={studentForm.wants_neet_classes}
                                        onChange={handleStudentFormChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Needs Books"
                                        name="needs_books"
                                        checked={studentForm.needs_books}
                                        onChange={handleStudentFormChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Wants Journals"
                                        name="wants_journals"
                                        checked={studentForm.wants_journals}
                                        onChange={handleStudentFormChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Wants Mentorship"
                                        name="wants_mentorship"
                                        checked={studentForm.wants_mentorship}
                                        onChange={handleStudentFormChange}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Wants Volunteering"
                                        name="wants_volunteering"
                                        checked={studentForm.wants_volunteering}
                                        onChange={handleStudentFormChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Other Preferences</Form.Label>
                                    <Form.Control as="textarea" rows={2} name="other_preferences" value={studentForm.other_preferences} onChange={handleStudentFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Why should we consider you?</Form.Label>
                                    <Form.Control as="textarea" rows={2} name="why_consider_you" value={studentForm.why_consider_you} onChange={handleStudentFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Check
                                        type="checkbox"
                                        label="I give my consent to submit this information"
                                        name="consent_given"
                                        checked={studentForm.consent_given}
                                        onChange={handleStudentFormChange}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            {step > 1 && (
                                <Button variant="secondary" onClick={() => setStep(step - 1)}>
                                    Back
                                </Button>
                            )}
                            {step < 3 && (
                                <Button variant="primary" onClick={e => { e.preventDefault(); setStep(step + 1); }}>
                                    Next
                                </Button>
                            )}
                            {step === 3 && (
                                <Button type="submit" variant="success">
                                    Submit
                                </Button>
                            )}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
