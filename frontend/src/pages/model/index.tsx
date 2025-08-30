"use client";

import { useEffect } from "react";
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

// ✅ Fix TS2339 by declaring global type for google
declare global {
    interface Window {
        google: typeof google;
    }
}

export default function ModelPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ✅ Load Google Maps script dynamically
    useEffect(() => {
        const initMap = () => {
            if (!window.google) return;

            const locations: [string, number, number][] = [
                ["<b>Gaya</b><br>Bihar, India", 24.7914, 85.0002],
                ["<b>Bahraich</b><br>Uttar Pradesh, India", 27.574, 81.5941],
                ["<b>Chhatarpur</b><br>Madhya Pradesh, India", 24.9142, 79.5887],
                ["<b>Malkangiri</b><br>Odisha, India", 18.356, 81.8896],
                ["<b>Dhubri</b><br>Assam, India", 26.0185, 89.9856],
            ];

            const map = new window.google.maps.Map(
                document.getElementById("map") as HTMLElement,
                {
                    zoom: 5,
                    center: { lat: 23.0359639, lng: 79.5092386 }, // Central India
                }
            );

            const infowindow = new window.google.maps.InfoWindow();

            locations.forEach(([content, lat, lng]) => {
                const marker = new window.google.maps.Marker({
                    position: { lat, lng },
                    map,
                });

                marker.addListener("click", () => {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            });
        };

        if (typeof window !== "undefined" && !window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
            script.async = true;
            script.onload = initMap;
            document.body.appendChild(script);
        } else {
            initMap();
        }
    }, []);

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

    const districts = ["Gaya", "Bahraich", "Chhatarpur", "Malkangiri", "Dhubri"];

    return (
        <div className="py-5">
            <Container>
                {/* Section 3.1 - 5 Pillars */}
                <motion.h2
                    className="text-center mb-4 fw-bold"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    The 5 Pillars of Prankiran
                </motion.h2>
                <Row className="g-4 justify-content-center  ">
                    {pillars.map((pillar, index) => (
                        <Col md={4} key={index}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="text-center shadow-lg p-3 h-100 rounded-4 border-0 icon-3d">
                                    <div className="icon-3d text-white">
                                        {pillar.icon}
                                    </div>

                                    {/* <div className="text-primary mb-3">
                                        {pillar.icon}
                                    </div> */}
                                    <Card.Title>{pillar.title}</Card.Title>
                                    <Card.Text>{pillar.desc}</Card.Text>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Section 3.2 - Doctor-to-Doctor Flow */}
                <motion.h2
                    className="text-center my-5 fw-bold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    Doctor-to-Doctor Consultation Flow
                </motion.h2>
                <Row className="justify-content-center text-center">
                    {flowSteps.map((f, i) => (
                        <Col md={2} sm={6} key={i}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <div className="bg-light shadow rounded-circle p-4 mb-3 d-inline-block text-primary icon-3d ">
                                    {f.icon}
                                </div>
                                <p>{f.step}</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Section 3.3 - District Pilots */}
                <motion.h2
                    className="text-center my-5 fw-bold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    District Pilots
                </motion.h2>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <p>
                            Implementation of the model is being tested in select
                            districts across India.
                        </p>
                        <ul className="list-unstyled fw-bold">
                            {districts.map((d, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="mb-2"
                                >
                                    📍 {d}
                                </motion.li>
                            ))}
                        </ul>

                        {/* Interactive Map */}
                        <div
                            id="map"
                            className="mt-4 rounded shadow overflow-hidden"
                            style={{ height: "500px", width: "100%" }}
                        ></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
