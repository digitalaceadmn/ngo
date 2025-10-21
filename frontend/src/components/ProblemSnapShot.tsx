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
import Doctor from "@/assets/images/green-doctor.jpeg";
import { FaUserDoctor } from "react-icons/fa6";
import { FaChild } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaHospital } from "react-icons/fa";

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
        <section className="py-5" style={{ background: "#fff9f2" }}>
            <Container>
                <Row className="text-center mb-5">
                    <Col>
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold display-5 text-success"
                        >
                            Problem Snapshot
                        </motion.h2>
                        {/* <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="fs-5 text-muted"
                        >
                            <strong className="text-danger">80% of CHCs lack specialists</strong>
                        </motion.p> */}
                    </Col>
                </Row>
                <Row className="align-items-center g-4 mb-4">
                    <Col md={12} sm={12}>
                        <div className="d-flex flex-column flex-md-row align-items-center gap-4 bg-white rounded-5 p-3 shadow-sm">
                            <motion.img
                                src={Doctor.src}
                                alt="Doctor Shortage"
                                style={{ maxHeight: "400px", width: "100%", objectFit: "contain", borderRadius: "25px" }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                            <motion.div>
                                <Card className="shadow-none h-100 border-0 rounded-3 p-0">
                                    <CardContent>
                                        {/* <Stethoscope size={40} className="text-primary mb-3" /> */}
                                        <Typography variant="h4" gutterBottom>
                                            80% of India’s Community Health Centres Struggle Without Specialists
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Community Health Centres (CHCs) form the backbone of India’s rural healthcare system, acting as referral units for Primary Health Centres (PHCs).
                                            Each CHC is mandated to have four key specialists – a surgeon, physician, gynecologist, and pediatrician.
                                            However, nearly <b>80% of CHCs lack these essential specialists</b>, leaving millions of rural families deprived of critical medical services.
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            The shortage is most acute in underserved regions. Rural patients often travel long distances to district hospitals,
                                            causing delays in treatment and increased out-of-pocket expenses. Pregnant women, children, and chronic patients are especially vulnerable.
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Factors such as poor infrastructure, lack of incentives, and challenging living conditions deter doctors from working in rural areas.
                                            Bridging this gap requires incentives, telemedicine, public-private partnerships, and NGO involvement to deliver timely and affordable care.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </Col>
                </Row>
                <div className="grid md:grid-cols-4 gap-4">
                    {/* Awareness */}
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:scale-105 transition text-center">
                        <FaUserDoctor className="text-gold text-5xl mb-4 mx-auto text-success" />
                        <p className="text-dark mt-2 fs-4 mb-0">
                            1250+
                        </p>
                        <h5 className="text-xl font-semibold text-dark">Monthly Consults</h5>
                    </div>

                    {/* Diagnosis */}
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:scale-105 transition text-center">
                        <FaChild className="text-gold text-5xl mb-4 mx-auto text-warning" />
                        <p className="text-dark mt-2 fs-4 mb-0">
                            3400+
                        </p>
                        <h5 className="text-xl font-semibold text-dark">Child Patients</h5>
                    </div>

                    {/* Treatment */}
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:scale-105 transition text-center">
                        <MdLocationOn className="text-gold text-5xl mb-4 mx-auto text-danger" />
                        <p className="text-dark mt-2 fs-4 mb-0">
                            78000 km
                        </p>
                        <h5 className="text-xl font-semibold text-dark">Travel for Care</h5>
                    </div>

                    {/* Support */}
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:scale-105 transition text-center">
                        <FaHospital className="text-gold text-5xl mb-4 mx-auto text-primary" />
                        <p className="text-dark mt-2 fs-4 mb-0">
                            45000+
                        </p>
                        <h5 className="text-xl font-semibold text-dark">Beds Shortage</h5>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ProblemSnapShot;
