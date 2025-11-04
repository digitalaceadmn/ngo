"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Typography, Card, Divider } from "@mui/material";
import { Quote } from "lucide-react";
import Person from "@/assets/images/founder-image.jpg";

export default function FounderSection() {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="founder-section">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-center mb-5">
                        ✨ Our Founder
                    </h2>

                    <Row className="align-items-center gy-5">

                        {/* Founder Image */}
                        <Col md={5} className="text-center d-flex justify-content-center align-items-center">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="founder-image-wrapper"
                            >
                                <div className="founder-aura"></div>
                                <img
                                    src={Person.src}
                                    alt="Himanshu Tiwari"
                                    className="founder-image"
                                />
                            </motion.div>
                        </Col>

                        {/* Founder Story */}
                        <Col md={7}>
                            <Card className="founder-card">
                                <Typography variant="h5" className="founder-heading">
                                    🌟 The Journey of PranKiran
                                </Typography>

                                <Typography variant="body1" className="founder-paragraph">
                                    When <strong>Himanshu Tiwari</strong> witnessed the impact of
                                    cancer within his own circle, he realized that treatment
                                    begins long before the first prescription — it begins with{" "}
                                    <span className="highlight-text">
                                        courage, compassion, and connection
                                    </span>.
                                </Typography>

                                <Card variant="outlined" className="founder-quote">
                                    <Typography variant="body1" fontStyle="italic">
                                        <Quote size={18} className="me-1 text-warning" />
                                        “Healing is more than medicine — it is human connection,
                                        small acts of care, and a reminder that you are never
                                        alone.”
                                    </Typography>
                                </Card>

                                <Typography variant="body1" className="founder-paragraph">
                                    Watching loved ones struggle not only with the illness but
                                    also with silence and fear, Himanshu felt a calling to create
                                    a space where no one faces the journey alone. That calling
                                    became <strong>PranKiran – Ray of Vitality</strong>.
                                </Typography>

                                <Typography variant="h6" className="founder-subtitle">
                                    🌱 The Philosophy
                                </Typography>
                                <ul className="founder-list">
                                    <li>
                                        <strong>“Pran”</strong> (life breath) – the essence of being.
                                    </li>
                                    <li>
                                        <strong>“Kiran”</strong> (ray of light) – hope in the darkest
                                        times.
                                    </li>
                                    <li>
                                        Together, they represent vitality, dignity, and compassion.
                                    </li>
                                </ul>

                                <Typography variant="body1" className="founder-paragraph">
                                    Under his leadership, PranKiran was designed as an early
                                    emotional support system for patients and caregivers. Through
                                    guided check-ins, empowerment, and storytelling, his vision is
                                    to bring calm and dignity into lives disrupted by cancer.
                                </Typography>
                            </Card>
                        </Col>
                    </Row>
                </motion.div>
            </Container>
        </section>
    );
}
