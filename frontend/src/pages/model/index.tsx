"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
    MenuBook,
    Groups,
    School,
    LocalHospital,
    Handshake,
    UploadFile,
    MedicalInformation,
    NoteAlt,
    PersonPinCircle,
    Favorite,
} from "@mui/icons-material";

export default function ModelPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ✅ Districts list (used for tabs)
    const districts = ["Gaya", "Bahraich", "Chhatarpur", "Malkangiri", "Dhubri"];

    // ✅ Map embeds for all tabs
    const districtMapLinks: Record<string, string> = {
        Gaya:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57956.981074475276!2d84.9839681105608!3d24.784791192866088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32a440a1b3c1f%3A0xcef6b223bdbf34a6!2sGaya%2C%20Bihar!5e0!3m2!1sen!2sin!4v1761948657342!5m2!1sen!2sin",
        Bahraich:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.5051491539476!2d81.5891!3d27.5710!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a8a6292f8dc05%3A0xda09a022b2b5bb0d!2sBahraich%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1762034768742!5m2!1sen!2sin",
        Chhatarpur:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.506118701935!2d79.5900!3d24.9140!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b0890f7e7369%3A0x60bfa9a2ae0b6a5c!2sChhatarpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1762034857668!5m2!1sen!2sin",
        Malkangiri:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.7276722484594!2d81.8896!3d18.3560!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201f1dce2748d1%3A0x1df8c675f4ef5df3!2sMalkangiri%2C%20Odisha!5e0!3m2!1sen!2sin!4v1762034945723!5m2!1sen!2sin",
        Dhubri:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.508280828844!2d89.9856!3d26.0185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3759c9f17826d533%3A0x847f2b5756fa0fe9!2sDhubri%2C%20Assam!5e0!3m2!1sen!2sin!4v1762035027611!5m2!1sen!2sin",
    };

    const [activeDistrict, setActiveDistrict] = useState(districts[0]);

    const pillars = [
        {
            title: "Knowledge Updates",
            desc: "Regular dissemination of the latest medical information and guidelines.",
            icon: <MenuBook fontSize="large" className="text-white" />,
        },
        {
            title: "Patient Awareness",
            desc: "Community education initiatives to improve understanding of health issues and services.",
            icon: <Groups fontSize="large" className="text-white" />,
        },
        {
            title: "Aspirant Education",
            desc: "Training and educational support for future healthcare professionals.",
            icon: <School fontSize="large" className="text-white" />,
        },
        {
            title: "Consultation Support",
            desc: "Tools and services to help GPs make better clinical decisions.",
            icon: <LocalHospital fontSize="large" className="text-white" />,
        },
        {
            title: "Doctor-to-Doctor Consultation (Flagship)",
            desc: "A structured channel for general practitioners to consult with specialists.",
            icon: <Handshake fontSize="large" className="text-white" />,
        },
    ];

    const flowSteps = [
        { step: "GP uploads case", icon: <UploadFile fontSize="large" className="text-white" /> },
        { step: "Specialist responds", icon: <MedicalInformation fontSize="large" className="text-white" /> },
        { step: "Advice note sent", icon: <NoteAlt fontSize="large" className="text-white" /> },
        { step: "Navigator follows up", icon: <PersonPinCircle fontSize="large" className="text-white" /> },
        { step: "Patient benefits", icon: <Favorite fontSize="large" className="text-white" /> },
    ];

    return (
        <div className="model-root py-5">
            <Container>
                {/* Title */}
                <motion.h2
                    className="text-center mb-2 fw-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    The 5 Pillars of Prankiran
                </motion.h2>
                <motion.p
                    className="text-center text-muted mb-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    A modern, scalable healthcare enablement framework.
                </motion.p>

                {/* Pillars */}
                <Row className="g-4 justify-content-center">
                    {pillars.map((pillar, index) => (
                        <Col lg={4} md={6} key={index}>
                            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                                <Card className="glass-card h-100 border-0 rounded-4 p-3 shadow-sm">
                                    <div className="icon-badge mb-3" aria-hidden="true">
                                        {pillar.icon}
                                    </div>
                                    <Card.Title className="fw-bold mb-2">{pillar.title}</Card.Title>
                                    <Card.Text className="text-muted">{pillar.desc}</Card.Text>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Flow */}
                <motion.h2
                    className="text-center my-5 fw-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    Doctor-to-Doctor Consultation Flow
                </motion.h2>

                <Row className="justify-content-center">
                    <Col lg={10}>
                        <div className="flow-track position-relative">
                            {flowSteps.map((f, i) => (
                                <motion.div
                                    key={i}
                                    className="flow-step text-center"
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.12 }}
                                >
                                    <div className="flow-node shadow-sm">
                                        <div className="flow-icon">{f.icon}</div>
                                    </div>
                                    <p className="mt-2 text-success fw-semibold">{f.step}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Col>
                </Row>

                {/* District Pilots */}
                <motion.h2
                    className="text-center my-5 fw-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    District Pilots
                </motion.h2>

                <Row className="justify-content-center">
                    <Col lg={10}>
                        <p className="text-muted text-center mb-4">
                            Implementation of the model is being tested in select districts across India.
                        </p>

                        {/* Tabs */}
                        <div className="district-tabs d-flex flex-wrap justify-content-center gap-2 mb-4">
                            {districts.map((d, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setActiveDistrict(d)}
                                    className={`district-tab-btn rounded-pill px-4 py-2 fw-semibold ${activeDistrict === d ? "active" : ""
                                        }`}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: i * 0.08 }}
                                >
                                    📍 {d}
                                </motion.button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <motion.div
                            key={activeDistrict}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-center mb-4"
                        >
                            <h5 className="fw-bold">{activeDistrict}</h5>
                            <p className="text-muted small mb-2">
                                Pilot site for improving specialist access and primary healthcare support.
                            </p>
                            <p className="fw-medium text-primary-emphasis">Map pin highlights district 👇</p>
                        </motion.div>

                        {/* Map (iframe, updates per tab) */}
                        <div className="ratio ratio-16x9 mt-3 rounded-4 overflow-hidden shadow-lg">
                            <iframe
                                key={activeDistrict} // force reload when tab changes
                                src={districtMapLinks[activeDistrict]}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                style={{ border: 0 }}
                                title={`${activeDistrict} map`}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
