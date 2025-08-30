"use client";

import React, { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import Banner from "@/assets/images/about-us.jpg";
import { motion } from "framer-motion";
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
import OurStory from "@/assets/images/our-story.jpg";


export default function AboutPage() {
    const { setTitle } = useLayout();

    useEffect(() => {
        setTitle("About");
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
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="fw-bold mb-3 d-flex align-items-center gap-2">
                            <Lightbulb color="warning" /> Our Story
                        </h2>
                        <p className="text-muted">
                            When <b>Himanshu Tiwari</b> witnessed the impact of cancer within his
                            own circle, he realized that treatment begins long before the first
                            prescription. It begins with courage, compassion, and connection.
                            That calling became <b>PranKiran – Ray of Vitality</b>.
                        </p>
                        <p className="text-muted">
                            For Himanshu, “Pran” (life breath) and “Kiran” (ray of light) are a
                            philosophy: every person deserves light even in the darkest times.
                            With guided check-ins, caregiver empowerment, and community
                            storytelling, his vision is to bring calm and dignity into lives
                            disrupted by cancer.
                        </p>
                    </motion.div>
                </Col>
                <Col md={6}>
                    <motion.img
                        src={OurStory.src}
                        alt="Our Story"
                        className="img-fluid rounded shadow"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    />
                </Col>
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
                            className="btn btn-primary px-4"
                        >
                            Join as Doctor
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-success px-4"
                        >
                            Partner as NGO
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-warning px-4"
                        >
                            Support as Funder
                        </motion.button>
                    </div>
                </Container>
            </section>
        </>
    );
}
