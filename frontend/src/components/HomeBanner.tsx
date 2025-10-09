"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Banner from "@/assets/images/banner-7.png";
import {  AnimatePresence } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

import { Stethoscope, Handshake, HeartHandshake } from "lucide-react";
import ModalForm from "@/components/ModalForm";

type FormType = "doctor" | "ngo" | "support";

const HomeBanner = () => {
    const [showContent, setShowContent] = useState(false);
    const [modalType, setModalType] = useState<FormType | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="position-relative d-flex align-items-center"
            style={{
                minHeight: isMobile ? "80vh" : "120vh",
                height: isMobile ? "auto" : "120vh",
                backgroundImage: `url('${Banner.src}')`,
                backgroundSize: "cover",
                backgroundPosition: isMobile ? "center" : "bottom",
                justifyContent: isMobile ? "center" : "flex-end",
                padding: isMobile ? "2rem 1rem" : "0"
            }}
        >
            {/*<div*/}
            {/*    className="position-absolute top-0 start-0 w-100 h-100"*/}
            {/*    style={{ background: "rgba(255,255,255,0.2)" }}*/}
            {/*/>*/}

            {/* Hero Content */}

            <div
                className="position-relative z-1 d-flex flex-column justify-content-center"
                style={{
                    maxWidth: isMobile ? "100%" : "650px",
                    padding: isMobile ? "1.5rem" : "2rem",
                    background: "#5b78b45e",
                    borderRadius: "10px",
                    margin: isMobile ? "0 auto" : "0",
                    textAlign: isMobile ? "center" : "left"
                }}
            >
                {/* Animated Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="fw-bold mb-3"
                    style={{
                        fontSize: isSmallMobile ? "1.8rem" : isMobile ? "2.2rem" : "3.2rem",
                        lineHeight: "1.3",
                        color: "#fff",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                    }}
                >
                    PRANKIRAN –{" "}
                    <span>
                        Vitality & Care for Cancer Patients
                    </span>
                </motion.h1>

                {/* Animated Tagline */}
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={showContent ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    style={{
                        fontSize: isSmallMobile ? "1rem" : isMobile ? "1.1rem" : "1.3rem",
                        color: "#f1f1f1",
                        lineHeight: "1.7",
                        marginBottom: "2rem",
                    }}
                >
                    Lighting the path of{" "}
                    <strong style={{ color: "#f9a826" }}>Awareness, Guidance & Learning</strong>{" "}
                    for Patients, Doctors & Volunteers.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className={`d-flex ${isMobile ? 'flex-column' : 'flex-wrap'} gap-3`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.6 }}
                >
                    {/* Join as Doctor */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`btn btn-warning ${isMobile ? 'btn-md' : 'btn-lg'} ${isMobile ? 'px-3' : 'px-4'} d-flex align-items-center justify-content-center gap-2 ${isMobile ? 'w-100' : ''}`}
                        onClick={() => setModalType("doctor")}
                        style={{
                            borderRadius: "50px",
                            fontWeight: "600",
                            boxShadow: "0 4px 15px rgba(249,168,38,0.4)",
                            fontSize: isMobile ? '0.9rem' : 'inherit'
                        }}
                    >
                        <Stethoscope size={isMobile ? 18 : 22} /> Join as a Doctor
                    </motion.button>

                    {/* Partner as NGO */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`btn btn-outline-light ${isMobile ? 'btn-md' : 'btn-lg'} ${isMobile ? 'px-3' : 'px-4'} d-flex align-items-center justify-content-center gap-2 ${isMobile ? 'w-100' : ''}`}
                        onClick={() => setModalType("ngo")}
                        style={{
                            borderRadius: "50px",
                            fontWeight: "600",
                            border: "2px solid #fff",
                            fontSize: isMobile ? '0.9rem' : 'inherit'
                        }}
                    >
                        <Handshake size={isMobile ? 18 : 22} /> Partner as NGO
                    </motion.button>

                    {/* Support Our Initiative */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`btn btn-success ${isMobile ? 'btn-md' : 'btn-lg'} ${isMobile ? 'px-3' : 'px-4'} d-flex align-items-center justify-content-center gap-2 ${isMobile ? 'w-100' : ''}`}
                        onClick={() => setModalType("support")}
                        style={{
                            borderRadius: "50px",
                            fontWeight: "600",
                            boxShadow: "0 4px 15px rgba(40,167,69,0.4)",
                            fontSize: isMobile ? '0.9rem' : 'inherit'
                        }}
                    >
                        <HeartHandshake size={isMobile ? 18 : 22} /> Support Our Initiative
                    </motion.button>
                </motion.div>
            </div>
            <AnimatePresence>{modalType && <ModalForm type={modalType} onClose={() => setModalType(null)} />}</AnimatePresence>
        </section>
    );
};

export default HomeBanner;
