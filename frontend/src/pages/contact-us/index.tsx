"use client";

import React, { useEffect, useState } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import Banner from "@/assets/images/contact-us.jpg";
import { motion } from "framer-motion";
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

export default function ContactPage() {
    const { setTitle } = useLayout();

    const [selected, setSelected] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

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
        setShowModal(true);
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
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="fw-bold display-4"
                >
                    Contact Us
                </motion.h1>
            </section>

            {/* Contact Details */}
            <Container className="py-5">
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

            {/* Collaboration Form */}
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
                            { icon: <Favorite color="error" fontSize="large" />, label: "Funder" },
                        ].map((item, idx) => (
                            <Col md={3} key={idx}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleCardClick(item.label)}
                                    className={`p-4 rounded shadow text-center h-100 cursor-pointer ${
                                        selected === item.label ? "bg-soft-golden text-white" : "bg-white"
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
        </>
    );
}
