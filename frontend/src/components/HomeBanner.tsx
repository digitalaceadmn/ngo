"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useMediaQuery, useTheme } from "@mui/material";
import { Stethoscope, Handshake, HeartHandshake } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import Banner from "@/assets/images/new-banner.jpeg";

type FormType = "doctor" | "ngo" | "support";

const HomeBanner = () => {
    const [showContent, setShowContent] = useState(false);
    const [modalType, setModalType] = useState<FormType | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="position-relative text-center w-100"
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Background */}
            <div
                style={{
                    backgroundImage: `url(${Banner.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    filter: "brightness(0.75)",
                }}
            ></div>

            {/* Dark Overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    background: "rgb(0 0 0 / 17%)",
                }}
            ></div>

            {/* Content */}
            <Container
                fluid
                className="d-flex flex-column align-items-center justify-content-top h-100 text-light position-relative pt-5"
                style={{ zIndex: 2 }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="fw-bold mb-2 text-warning"
                    style={{
                        fontSize: isSmallMobile
                            ? "2rem"
                            : isMobile
                                ? "2.5rem"
                                : "3.5rem",
                        letterSpacing: "1px",
                    }}
                >
                    PRANKIRAN
                </motion.h1>

                <motion.h5
                    initial={{ opacity: 0, y: 30 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="fw-semibold text-white mb-4"
                    style={{
                        fontSize: isSmallMobile ? "1rem" : isMobile ? "1.2rem" : "1.5rem",
                    }}
                >
                    Vitality & Care for Cancer Patients
                </motion.h5>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="px-3 mb-4 fw-semibold text-white text-center"
                    style={{
                        fontSize: isSmallMobile ? "1rem" : isMobile ? "1.1rem" : "1.3rem",
                        maxWidth: "700px",
                        lineHeight: "1.8",
                    }}
                >
                    Lighting the path of{" "}
                    <strong className="text-warning">
                        Awareness, Guidance & Learning
                    </strong>{" "}
                    for Patients, Doctors & Volunteers.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <Row
                        className={`justify-content-center g-3 ${isMobile ? "w-100 px-4" : ""
                            }`}
                    >
                        <Col xs={12} sm={6} md="auto">
                            <Button
                                variant="warning"
                                size={isMobile ? "sm" : "lg"}
                                className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 w-100"
                                onClick={() => setModalType("doctor")}
                            >
                                <Stethoscope size={20} /> Join as Doctor
                            </Button>
                        </Col>

                        <Col xs={12} sm={6} md="auto">
                            <Button
                                variant="outline-light"
                                size={isMobile ? "sm" : "lg"}
                                className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 w-100"
                                onClick={() => setModalType("ngo")}
                            >
                                <Handshake size={20} /> Partner as NGO
                            </Button>
                        </Col>

                        <Col xs={12} sm={6} md="auto">
                            <Button
                                variant="success"
                                size={isMobile ? "sm" : "lg"}
                                className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 w-100"
                                onClick={() => setModalType("support")}
                            >
                                <HeartHandshake size={20} /> Support Our Initiative
                            </Button>
                        </Col>
                    </Row>
                </motion.div>
            </Container>

            {/* Modal */}
            <AnimatePresence>
                {modalType && (
                    <ModalForm type={modalType} onClose={() => setModalType(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default HomeBanner;
