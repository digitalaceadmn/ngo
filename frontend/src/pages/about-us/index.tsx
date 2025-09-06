"use client";

import React, { useEffect, useState } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import Banner from "@/assets/images/about-us.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import {
    Favorite,
    Visibility,
    Public,
    Lock,
    School,
    LocalHospital,
    Flag,
    EmojiPeople,
    Lightbulb,
    Group,
} from "@mui/icons-material";
import Person from "@/assets/images/founder-image.jpg";
import ModalForm from "@/components/ModalForm";

const founders = [
    {
        name: "John Doe",
        role: "Founder & CEO",
        image: "/images/founders/founder1.jpg",
        story: "<p>When Himanshu Tiwari witnessed the impact of cancer within his own circle, he realized that treatment begins long before the first prescription. It begins with courage, compassion, and connection. Watching loved ones struggle—not only with the illness, but with silence, fear, and isolation—he felt a calling to create a space where no one has to face the journey alone.</p>",
    }
];
type FormType = "doctor" | "ngo" | "support";

export default function AboutPage() {
    const { setTitle } = useLayout();
    const [modalType, setModalType] = useState<FormType | null>(null);

    useEffect(() => {
        setTitle("About us - PranKiran");
    }, [setTitle]);

    return (
        <>
            <section
                className="position-relative d-flex align-items-center justify-content-center text-center text-white"
                style={{
                    height: "70vh",
                    backgroundImage: `url('${Banner.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    marginBottom: "30px",
                }}
            >

            </section>

            <Row className="px-5 py-5  align-items-center bg-soft-golden">
                <Container>
                    <h2 className="text-center mb-5 text-dark-golden">✨ Our Founder</h2>

                    <div id="founderCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {founders.map((founder, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                >
                                    <Row className="align-items-center founder-story">
                                        {/* Founder Image */}
                                        <Col md={5} className="text-center">
                                            <img
                                                src={Person.src}
                                                alt={founder.name}
                                                width={350}
                                                height={350}
                                                className="d-block mx-auto  border border-4 border-golden shadow-sm"
                                                style={{ objectFit: "cover", objectPosition: "center", borderRadius: "50%", height: '350px', width: '350px' }}
                                            />
                                        </Col>

                                        {/* Founder Story */}
                                        <Col md={7} className="mt-4 mt-md-0">
                                            <h4 className="fw-bold text-dark mb-3">The Journey of PranKiran</h4>

                                            <p className="fs-5 text-muted">
                                                When <span className="fw-semibold text-dark">Himanshu Tiwari</span> witnessed
                                                the impact of cancer within his own circle, he realized that treatment begins
                                                long before the first prescription. It begins with <span className="text-dark-golden">courage, compassion, and connection</span>.
                                            </p>

                                            <blockquote className="border-start border-3 border-golden ps-3 fst-italic text-secondary my-3">
                                                “Healing is more than medicine — it is human connection, small acts of care,
                                                and a reminder that you are never alone.”
                                            </blockquote>

                                            <p className="fs-5 text-muted">
                                                Watching loved ones struggle not only with the illness, but with silence,
                                                fear, and isolation, Himanshu felt a calling to create a space where no one
                                                has to face the journey alone. That calling became <span className="fw-bold text-dark">PranKiran – Ray of Vitality</span>.
                                            </p>

                                            <h5 className="mt-4 text-dark fw-bold">🌟 The Philosophy</h5>
                                            <ul className="fs-6 text-muted">
                                                <li><strong>“Pran”</strong> (life breath) – the essence of being.</li>
                                                <li><strong>“Kiran”</strong> (ray of light) – hope in the darkest times.</li>
                                                <li>Together, they represent vitality, dignity, and compassion.</li>
                                            </ul>

                                            <p className="fs-5 text-muted mt-3">
                                                Under his leadership, PranKiran was designed as an early emotional support
                                                system for patients and caregivers. Through guided check-ins, caregiver
                                                empowerment, and community storytelling, his vision is to bring calm and
                                                dignity into lives disrupted by cancer.
                                            </p>

                                            <h5 className="text-dark-golden fw-bold mt-4">{founder.role}</h5>
                                            <h6 className="fst-italic text-secondary">— {founder.name}</h6>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Row>

            <section className="bg-light py-5">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
                            <Flag color="error" /> Our Vision
                        </h2>
                        <p className="lead text-muted">
                            “A ray of vitality for every patient through empowered doctors.”
                        </p>
                    </motion.div>
                </Container>
            </section>

            <Container className="my-5">
                <h2 className="fw-bold text-center mb-4 d-flex align-items-center justify-content-center gap-2">
                    <Group color="success" /> Our Core Values
                </h2>
                <Row className="g-4">
                    {[
                        {
                            icon: <Favorite color="error" fontSize="large" />,
                            title: "Compassion",
                            text: "Caring deeply for every patient’s journey.",
                        },
                        {
                            icon: <Visibility color="primary" fontSize="large" />,
                            title: "Clarity",
                            text: "Building trust through transparency and guidance.",
                        },
                        {
                            icon: <Public color="success" fontSize="large" />,
                            title: "Equity",
                            text: "Ensuring fair and inclusive access to healthcare.",
                        },
                        {
                            icon: <Lock color="action" fontSize="large" />,
                            title: "Privacy",
                            text: "Respecting dignity and safeguarding personal information.",
                        },
                        {
                            icon: <School color="warning" fontSize="large" />,
                            title: "Learning",
                            text: "Growing continuously to serve better every day.",
                        },
                    ].map((value, idx) => (
                        <Col md={4} key={idx}>
                            <motion.div
                                className="p-4 bg-white rounded shadow text-center h-100"
                                whileHover={{ scale: 1.08, rotate: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {value.icon}
                                <h5 className="fw-bold mt-3">{value.title}</h5>
                                <p className="text-muted">{value.text}</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Global Inspirations */}
            <section className=" text-white py-5 bg-soft-golden">
                <Container>
                    <h2 className="fw-bold text-center mb-4 d-flex align-items-center justify-content-center gap-2">
                        <LocalHospital /> Global Inspirations
                    </h2>
                    <Row className="g-4">
                        {[
                            {
                                title: "Aravind Eye Care",
                                text: "Delivering world-class eye care with compassion and accessibility.",
                            },
                            {
                                title: "Narayana Health",
                                text: "Redefining affordable, quality healthcare for all.",
                            },
                            {
                                title: "eSanjeevani",
                                text: "India’s digital health platform bringing teleconsultations to millions.",
                            },
                            {
                                title: "Project ECHO",
                                text: "Sharing knowledge globally to empower local healthcare providers.",
                            },
                        ].map((item, idx) => (
                            <Col md={6} key={idx}>
                                <motion.div
                                    className="p-4 bg-light rounded shadow h-100"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <LocalHospital className="mb-2 text-warning" />
                                    <h5 className="fw-bold">{item.title}</h5>
                                    <p>{item.text}</p>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Join Our Movement */}
            <section className="py-5 bg-light">
                <Container className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="fw-bold mb-3"
                    >
                        Join Our Movement
                    </motion.h2>
                    <p className="lead text-muted mb-4">
                        Whether as a doctor, NGO partner, or supporter — together, we can
                        spread rays of vitality.
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setModalType("doctor")}
                            className="btn btn-primary px-4"
                        >
                            Join as Doctor
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setModalType("ngo")}
                            className="btn btn-success px-4"
                        >
                            Partner as NGO
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-warning px-4"
                            onClick={() => setModalType("support")}
                        >
                            Support Our Initiative
                        </motion.button>
                    </div>
                    <AnimatePresence>{modalType && <ModalForm type={modalType} onClose={() => setModalType(null)} />}</AnimatePresence>
                </Container>
            </section>
        </>
    );
}
