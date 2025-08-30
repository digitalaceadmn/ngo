"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardContent, Typography } from "@mui/material";
import { Stethoscope, Users, HeartPulse, Globe2, Hospital } from "lucide-react";

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
        <section className="py-5 bg-light">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-center mb-4 fw-bold">1.2 Problem Snapshot</h2>
                    <p className="text-center text-muted mb-5 fs-5">
                        Rural India continues to face major healthcare challenges.
                        Lack of specialists, insufficient hospital infrastructure,
                        and long travel distances are preventing timely access to
                        quality healthcare.
                    </p>
                </motion.div>

                {/* Problem Cards */}
                <Row className="g-4">
                    {/* Stat Card 1 */}
                    <Col md={3} sm={6}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card className="shadow-sm h-100 text-center">
                                <CardContent>
                                    <Stethoscope size={40} className="text-primary mb-3" />
                                    <Typography variant="h6" gutterBottom>
                                        80% of CHCs lack Specialists
                                    </Typography>
                                    <img
                                        src="https://img.icons8.com/external-flaticons-flat-flat-icons/512/external-doctor-hospital-flaticons-flat-flat-icons.png"
                                        alt="Doctor Shortage"
                                        style={{ height: "80px" }}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        Most rural health centers do not have gynecologists, pediatricians,
                                        or surgeons, creating massive gaps in primary care.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Col>

                    {/* Stat Card 2 */}
                    <Col md={3} sm={6}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card className="shadow-sm h-100 text-center">
                                <CardContent>
                                    <Users size={40} className="text-success mb-3" />
                                    <Typography variant="h6" gutterBottom>
                                        {counts.patients.toLocaleString()}+ Patients
                                    </Typography>
                                    <img
                                        src="https://img.icons8.com/external-flat-juicy-fish/512/external-patient-hospital-flat-flat-juicy-fish.png"
                                        alt="Patients"
                                        style={{ height: "80px" }}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        Millions of rural patients continue to face delays
                                        in receiving essential diagnosis and treatments.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Col>

                    {/* Stat Card 3 */}
                    <Col md={3} sm={6}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card className="shadow-sm h-100 text-center">
                                <CardContent>
                                    <Globe2 size={40} className="text-danger mb-3" />
                                    <Typography variant="h6" gutterBottom>
                                        {counts.distance.toLocaleString()}+ km Travel
                                    </Typography>
                                    <img
                                        src="https://img.icons8.com/external-flaticons-flat-flat-icons/512/external-long-distance-logistics-flaticons-flat-flat-icons.png"
                                        alt="Travel Distance"
                                        style={{ height: "80px" }}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        Patients often travel for hours to reach care,
                                        leading to missed or late treatments.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Col>

                    {/* Stat Card 4 (NEW) */}
                    <Col md={3} sm={6}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Card className="shadow-sm h-100 text-center">
                                <CardContent>
                                    <Hospital size={40} className="text-warning mb-3" />
                                    <Typography variant="h6" gutterBottom>
                                        {counts.beds.toLocaleString()} Bed Shortage
                                    </Typography>
                                    <img
                                        src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/512/external-hospital-hospital-and-medical-flatart-icons-flat-flatarticons.png"
                                        alt="Hospital Beds"
                                        style={{ height: "80px" }}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        Rural hospitals face massive shortages of beds
                                        and critical equipment, limiting emergency care access.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Col>
                </Row>

                {/* Infographic Row */}
                <Row className="mt-5 text-center">
                    <Col md={4}>
                        <h4 className="fw-bold text-danger">1 in 3</h4>
                        <p className="text-muted">villages lack any health facility</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="fw-bold text-warning">60%</h4>
                        <p className="text-muted">patients delay treatment due to cost & travel</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="fw-bold text-success">70%</h4>
                        <p className="text-muted">rural population depends on government healthcare</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProblemSnapShot;
