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
    Handshake,
    VolunteerActivism,
} from "@mui/icons-material";
import Person from "@/assets/images/founder-image.jpg";
import ModalForm from "@/components/ModalForm";
import FounderSection from "@/components/FounderSection";
import Compassion from "@/assets/images/about/Compassion.jpg";
import Equity from "@/assets/images/about/Equity.jpg";
import Clarity from "@/assets/images/about/Clarity.jpg";
import Privacy from "@/assets/images/about/Privacy.jpg";
import Learning from "@/assets/images/about/Learning.jpg";
import ECHO from "@/assets/images/about/ECHO.jpg";
import eSanjeevani from "@/assets/images/about/eSanjeevani.jpg";
import EyeCare from "@/assets/images/about/Eye-Care.jpg";
import NarayanaHealth from "@/assets/images/about/NarayanaHealth.jpg";

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
                    height: "400px",
                    backgroundImage: `url('${Banner.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                }}
            >

            </section>

            <FounderSection />

            <section className="vision-section position-relative py-5">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="vision-card mx-auto p-4 p-md-5 rounded-4">
                            <h2 className="fw-bold mb-3 d-flex align-items-center justify-content-center gap-2 text-white"> Our Vision
                            </h2>

                            <h4 className="fw-semibold text-white mb-0 fst-italic">
                                “A ray of vitality for every patient through empowered doctors.”
                            </h4>
                        </div>
                    </motion.div>
                </Container>
            </section>


            <section className="bg-soft-golden py-5">
                <Container>
                    <h2 className="fw-bold text-center mb-5 d-flex align-items-center justify-content-center gap-2"> Our Core Values
                    </h2>

                    <Row className="g-4">
                        {[
                            {
                                img: Compassion.src,
                                icon: <Favorite color="error" fontSize="large" />,
                                title: "Compassion",
                                text: "Caring deeply for every patient’s journey.",
                            },
                            {
                                img: Clarity.src,
                                icon: <Visibility color="primary" fontSize="large" />,
                                title: "Clarity",
                                text: "Building trust through transparency and guidance.",
                            },
                            {
                                img: Equity.src,
                                icon: <Public color="success" fontSize="large" />,
                                title: "Equity",
                                text: "Ensuring fair and inclusive access to healthcare.",
                            },
                            {
                                img: Privacy.src,
                                icon: <Lock color="info" fontSize="large" />,
                                title: "Privacy",
                                text: "Respecting dignity and safeguarding personal information.",
                            },
                            {
                                img: Learning.src,
                                icon: <School color="warning" fontSize="large" />,
                                title: "Learning",
                                text: "Growing continuously to serve better every day.",
                            },
                        ].map((value, idx) => (
                            <Col md={4} key={idx}>
                                <motion.div
                                    className="value-card position-relative overflow-hidden rounded-4"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <img src={value.img} alt={value.title} className="value-img" />

                                    {/* Gradient Overlay */}
                                    <div className="value-overlay"></div>

                                    {/* Text Content */}
                                    <div className="value-text position-absolute w-100 text-start px-3">
                                        {/* <div className="mb-2">{value.icon}</div> */}
                                        <h4 className="fw-bold text-white">{value.icon} {value.title}</h4>
                                        <p className="text-light small">{value.text}</p>
                                    </div>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>




            {/* Global Inspirations */}
            <section className="py-5 bg-soft-golden">
                <Container>
                    <h2 className="fw-bold text-center mb-5 d-flex align-items-center justify-content-center gap-2">Global Inspirations </h2>

                    <Row className="g-4">
                        {[
                            {
                                img: EyeCare.src,
                                title: "Aravind Eye Care",
                                text: "Delivering world-class eye care with compassion and accessibility.",
                            },
                            {
                                img: NarayanaHealth.src,
                                title: "Narayana Health",
                                text: "Redefining affordable, quality healthcare for all.",
                            },
                            {
                                img: eSanjeevani.src,
                                title: "eSanjeevani",
                                text: "India’s digital health platform bringing teleconsultations to millions.",
                            },
                            {
                                img: ECHO.src,
                                title: "Project ECHO",
                                text: "Sharing knowledge globally to empower local healthcare providers.",
                            },
                        ].map((item, i) => (
                            <Col md={3} key={i}>
                                <motion.div
                                    className="inspiration-card position-relative overflow-hidden rounded-circle"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <img src={item.img} alt={item.title} className="inspiration-img" />

                                    <div className="inspiration-overlay"></div>

                                    <div className="inspiration-content position-absolute w-100 text-center px-4">
                                        <h3 className="fw-bold text-white">{item.title}</h3>
                                        <p className="text-light small px-4">{item.text}</p>
                                    </div>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>


            {/* Join Our Movement */}
            <section className="bg-soft-golden position-relative py-5">
                <Container className="text-center position-relative">
                    <h2 className="fw-bold text-center d-flex align-items-center justify-content-center gap-2">Join Our Movement </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lead text-body mb-4"
                    >
                        Whether as a doctor, NGO partner, or supporter — together, we can spread rays of vitality.
                    </motion.p>

                    <Row className="g-4 justify-content-center">
                        {/* Doctor */}
                        <Col md={4} sm={10}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="cta-card p-4 rounded-4 h-100 text-start"
                            >
                                <div className="cta-icon-wrap mb-3">
                                    <LocalHospital className="cta-icon" />
                                </div>
                                <h5 className="fw-bold text-white mb-2">Join as Doctor</h5>
                                <p className="mb-3 text-white-50">
                                    Volunteer time, mentor peers, and deliver compassionate care on-site or via telehealth.
                                </p>
                                <button
                                    onClick={() => setModalType("doctor")}
                                    className="btn btn-light px-4"
                                    aria-label="Open form to join as a doctor"
                                >
                                    Get Started
                                </button>
                            </motion.div>
                        </Col>

                        {/* NGO */}
                        <Col md={4} sm={10}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="cta-card p-4 rounded-4 h-100 text-start"
                            >
                                <div className="cta-icon-wrap mb-3">
                                    <Handshake className="cta-icon" />
                                </div>
                                <h5 className="fw-bold text-white mb-2">Partner as NGO</h5>
                                <p className="mb-3 text-white-50">
                                    Co-create outreach, screenings, and continuity-of-care programs with measurable impact.
                                </p>
                                <button
                                    onClick={() => setModalType("ngo")}
                                    className="btn btn-light px-4"
                                    aria-label="Open form to partner as an NGO"
                                >
                                    Partner With Us
                                </button>
                            </motion.div>
                        </Col>

                        {/* Supporter */}
                        <Col md={4} sm={10}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="cta-card p-4 rounded-4 h-100 text-start"
                            >
                                <div className="cta-icon-wrap mb-3">
                                    <VolunteerActivism className="cta-icon" />
                                </div>
                                <h5 className="fw-bold text-white mb-2">Support Our Initiative</h5>
                                <p className="mb-3 text-white-50">
                                    Back our mission through funds, supplies, or advocacy every bit fuels more care.
                                </p>
                                <button
                                    onClick={() => setModalType("support")}
                                    className="btn btn-light px-4"
                                    aria-label="Open form to support our initiative"
                                >
                                    Support Now
                                </button>
                            </motion.div>
                        </Col>
                    </Row>

                    <AnimatePresence>
                        {modalType && <ModalForm type={modalType} onClose={() => setModalType(null)} />}
                    </AnimatePresence>
                </Container>

                {/* Decorative bottom wave */}
                <div className="cta-wave" aria-hidden="true"></div>
            </section>

        </>
    );
}


