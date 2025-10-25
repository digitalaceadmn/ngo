"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Card, CardContent, Typography } from "@mui/material";
import { Stethoscope, UserCheck, Users, HeartPulse, Globe2 } from "lucide-react";
import AutoPlayVideoSection from "@/components/AutoPlayVideoSection";

import styles from "@/styles/LogoSlider.module.css";
import OurSolution from "./OurSolution";
import ImpactTeaser from "./ImpactTeaser";


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
                <OurSolution />
                <AutoPlayVideoSection />
                <ImpactTeaser />

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
