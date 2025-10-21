"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import {
    Stethoscope,
    Baby,
    Hospital,
    HeartPulse,
    User,
    MapPin,
} from "lucide-react";
import DoctorShortage from "@/assets/images/doctor-shortage.png";

const ProblemSnapShot = () => {
    const [counts, setCounts] = useState({ consults: 0, patients: 0, distance: 0, beds: 0 });

    // Counter Animation
    useEffect(() => {
        let start = 0;
        const target = { consults: 1250, patients: 3400, distance: 78000, beds: 45000 };
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;

        const interval = setInterval(() => {
            start++;
            setCounts({
                consults: Math.floor((target.consults / steps) * start),
                patients: Math.floor((target.patients / steps) * start),
                distance: Math.floor((target.distance / steps) * start),
                beds: Math.floor((target.beds / steps) * start),
            });
            if (start >= steps) clearInterval(interval);
        }, stepTime);
    }, []);

    return (
        <section className="py-5" style={{background: "#fff9f2"}}>
            <Container>
                <Row className="text-center mb-5">
                    <Col>
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold display-5 text-dark"
                        >
                            Problem Snapshot
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="fs-5 text-muted"
                        >
                            <strong className="text-danger">80% of CHCs lack specialists</strong>
                        </motion.p>
                    </Col>
                </Row>
                <Row className="align-items-center g-4">
                    {/* Left Image */}
                    <Col md={6} sm={12} className="text-center">
                        <motion.img
                            src={DoctorShortage.src}
                            alt="Doctor Shortage"
                            style={{ maxHeight: "800px", width: "100%", objectFit: "contain" }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        />
                    </Col>

                    {/* Right Card Content */}
                    <Col md={6} sm={12}>
                        <motion.div>
                            <Card className="shadow-lg h-100 border-0 rounded-3 p-3">
                                <CardContent>
                                    {/* <Stethoscope size={40} className="text-primary mb-3" /> */}
                                    <Typography variant="h5" gutterBottom fontWeight="bold">
                                        80% of India’s Community Health Centres Struggle Without Specialists
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" paragraph>
                                        Community Health Centres (CHCs) form the backbone of India’s rural healthcare system, acting as referral units for Primary Health Centres (PHCs).
                                        Each CHC is mandated to have four key specialists – a surgeon, physician, gynecologist, and pediatrician.
                                        However, nearly <b>80% of CHCs lack these essential specialists</b>, leaving millions of rural families deprived of critical medical services.
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" paragraph>
                                        The shortage is most acute in underserved regions. Rural patients often travel long distances to district hospitals,
                                        causing delays in treatment and increased out-of-pocket expenses. Pregnant women, children, and chronic patients are especially vulnerable.
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" paragraph>
                                        Factors such as poor infrastructure, lack of incentives, and challenging living conditions deter doctors from working in rural areas.
                                        Bridging this gap requires incentives, telemedicine, public-private partnerships, and NGO involvement to deliver timely and affordable care.
                                    </Typography>

                                    <Divider className="my-3" />

                                    {/* Animated Stats */}
                                    <Row className="text-center">
                                        <Col xs={6} className="mb-3">
                                            <motion.div whileHover={{ scale: 1.1 }}>
                                                <User size={28} className="text-success mb-2 w-100" />
                                                <Typography variant="h6">{counts.consults}+</Typography>
                                                <h5 className="text-black">
                                                    Monthly Consults
                                                </h5>
                                            </motion.div>
                                        </Col>
                                        <Col xs={6} className="mb-3">
                                            <motion.div whileHover={{ scale: 1.1 }}>
                                                <Baby size={28} className="text-warning mb-2 w-100" />
                                                <Typography variant="h6">{counts.patients}+</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    Child Patients
                                                </Typography>
                                            </motion.div>
                                        </Col>
                                        <Col xs={6} className="mb-3">
                                            <motion.div whileHover={{ scale: 1.1 }}>
                                                <MapPin size={28} className="text-danger mb-2 w-100" />
                                                <Typography variant="h6">{counts.distance} km</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    Travel for Care
                                                </Typography>
                                            </motion.div>
                                        </Col>
                                        <Col xs={6} className="mb-3">
                                            <motion.div whileHover={{ scale: 1.1 }}>
                                                <Hospital size={28} className="text-primary mb-2 w-100" />
                                                <Typography variant="h6">{counts.beds}+</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    Beds Shortage
                                                </Typography>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProblemSnapShot;
