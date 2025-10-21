"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Card, CardContent, Typography } from "@mui/material";
import { Stethoscope, UserCheck, Users, HeartPulse, Globe2 } from "lucide-react";
import AutoPlayVideoSection from "@/components/AutoPlayVideoSection";

import styles from "@/styles/LogoSlider.module.css";


const ImpactSection = () => {
    const [counts, setCounts] = useState({ consults: 0, patients: 0, distance: 0 });

    // Counter Animation
    useEffect(() => {
        let start = 0;
        const target = { consults: 1250, patients: 3400, distance: 78000 };
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;

        const interval = setInterval(() => {
            start++;
            setCounts({
                consults: Math.floor((target.consults / steps) * start),
                patients: Math.floor((target.patients / steps) * start),
                distance: Math.floor((target.distance / steps) * start),
            });
            if (start >= steps) clearInterval(interval);
        }, stepTime);
    }, []);

    const logos = [
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
    ];


    return (
        <section className="py-5" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%)" }}>
            <Container>

                <Row className="text-center mb-3">
                    <Col>
                        <motion.h6
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold display-5 text-success"
                        >
                            Our Solution
                        </motion.h6>

                    </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                    <Col md={6} className="text-start mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold mb-3 display-6"
                        >
                            Doctor-to-Doctor Model
                        </motion.h2>
                    </Col>
                    <Col md={6} className="text-start mx-auto">
                        <span
                            className="mb-2 fs-3 text-secondary"
                        >
                            How it works ?
                        </span>
                        <p className="text-muted fs-5">
                            We empower local healthcare providers with the guidance and expertise of specialists, ensuring patients in underserved areas receive timely and accurate care.
                        </p>
                    </Col>
                </Row>

                <Row className="g-4 mb-5">
                    {[
                        { icon: <Stethoscope size={40} />, title: "Specialists", desc: "Share knowledge & guide complex cases." },
                        { icon: <UserCheck size={40} />, title: "Rural GPs", desc: "Get expert support, upgrade their skills, and provide better care locally." },
                        { icon: <Users size={40} />, title: "Patients", desc: " Receive improved, faster, and more affordable treatment without traveling long distances." },
                    ].map((item, i) => (
                        <Col md={4} key={i}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                style={{ height: "100%" }}
                            >
                                <Card
                                    className="shadow-lg h-100 border-0 rounded-4 text-center"
                                    style={{ transition: "0.3s", background: "linear-gradient(145deg, #ffffff, #f0f4ff)" }}
                                >
                                    <CardContent>
                                        <motion.div
                                            className="mb-3 text-primary d-flex justify-content-center"
                                        // animate={{ rotate: [0, 10, -10, 0] }}
                                        // transition={{ repeat: Infinity, duration: 3 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <Typography variant="h6" className="fw-bold  display-6">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                <AutoPlayVideoSection />

                <Row className="text-center mb-3">
                    <Col>
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold mb-3 display-5 text-success"
                        >
                            Impact Teaser
                        </motion.h2>
                        <p className="text-muted fs-5">
                            Our work is already making a measurable difference
                        </p>
                    </Col>
                </Row>



                <Row className="text-center g-4">
                    {[
                        { value: counts.consults, label: "Consultations Completed", icon: <HeartPulse size={32} /> },
                        { value: counts.patients, label: "Patients Helped", icon: <Users size={32} /> },
                        { value: counts.distance, label: "Kilometers of Travel Saved", icon: <Globe2 size={32} /> },
                    ].map((item, i) => (
                        <Col md={4} key={i}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="p-4 rounded-4 shadow-lg bg-white"
                            >
                                <div className="text-primary mb-2">{item.icon}</div>
                                <h6 className="fw-bold text-primary display-6" style={{ fontSize: "33px" }}>{item.value.toLocaleString()}+</h6>
                                <p className="text-muted">{item.label}</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                <p className="text-black fs-5 text-start mt-3">
                    🎯 This model not only improves health outcomes but also reduces costs, saves time, and builds capacity in rural healthcare systems.
                </p>

                {/*<Row className="mt-5 text-center">*/}
                {/*    <Col>*/}
                {/*        <p className="text-muted mb-3 fs-5">In Collaboration With</p>*/}
                {/*        <Carousel indicators={false} controls={false} interval={2000} className="w-75 mx-auto">*/}
                {/*            {logos.map((logo, index) => (*/}
                {/*                <Carousel.Item key={index}>*/}
                {/*                    <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">*/}
                {/*                        <img src={logo} alt={`Logo ${index + 1}`} className="rounded-4 shadow-sm bg-white p-2" style={{ width: "140px", height: "70px", objectFit: "contain" }} />*/}
                {/*                    </div>*/}
                {/*                </Carousel.Item>*/}
                {/*            ))}*/}
                {/*        </Carousel>*/}
                {/*    </Col>*/}
                {/*</Row>*/}


                <Row className="text-center mt-5 mb-3">
                    <Col>
                        <motion.h6
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold display-6 text-dark"
                        >
                            Our Partners
                        </motion.h6>

                    </Col>
                </Row>




                <Row className="mt-5 text-center">
                    <Col>

                        <div className={styles.slider}>
                            <div className={styles.slideTrack}>
                                {/* Repeat logos twice for smooth infinite scroll */}
                                {logos.concat(logos).map((logo, idx) => (
                                    <div className={styles.slide} key={idx}>
                                        <img src={logo} alt={`Logo ${idx}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>



            </Container>
        </section>
    );
};

export default ImpactSection;
