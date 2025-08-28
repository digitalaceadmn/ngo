"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Banner from "@/assets/images/banner3.jpg";

import { Stethoscope, Handshake, HeartHandshake } from "lucide-react";

const HomeBanner = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="position-relative d-flex align-items-center"
            style={{
                height: "80vh",
                backgroundImage: `url('${Banner.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed", // Parallax effect
            }}
        >
            {/* Hero Content */}
            <div
                className="position-relative z-1 d-flex flex-column justify-content-center"
                style={{ maxWidth: "650px", padding: "2rem", marginLeft: "8%" }}
            >
                {/* Animated Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="fw-bold mb-3"
                    style={{
                        fontSize: "3.2rem",
                        lineHeight: "1.3",
                        color: "#fff",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                    }}
                >
                    PRANKIRAN –{" "}
                    <span >
                        Vitality & Care for Cancer Patients
                    </span>
                </motion.h1>

                {/* Animated Tagline */}
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={showContent ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    style={{
                        fontSize: "1.3rem",
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
                    className="d-flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.6 }}
                >
                    {/* Join as Doctor */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-warning btn-lg px-4 d-flex align-items-center gap-2"
                        style={{
                            borderRadius: "50px",
                            fontWeight: "600",
                            boxShadow: "0 4px 15px rgba(249,168,38,0.4)",
                        }}
                    >
                        <Stethoscope size={22} /> Join as a Doctor
                    </motion.button>

                    {/* Partner as NGO */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline-light btn-lg px-4 d-flex align-items-center gap-2"
                        style={{
                            borderRadius: "50px",
                            fontWeight: "600",
                            border: "2px solid #fff",
                        }}
                    >
                        <Handshake size={22} /> Partner as NGO
                    </motion.button>

                    {/* Support as Funder */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-success btn-lg px-4 d-flex align-items-center gap-2"
                        style={{
                            borderRadius: "50px",
                            fontWeight: "600",
                            boxShadow: "0 4px 15px rgba(40,167,69,0.4)",
                        }}
                    >
                        <HeartHandshake size={22} /> Support as Funder
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeBanner;
