"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Box,
    Chip,
    CardMedia,
} from "@mui/material";
import {
    HeartPulse,
    Star,
    Lightbulb,
    Users,
    Rocket,
    Flag,
    Group,
    School,
} from "lucide-react";
import ModalForm from "@/components/ModalForm";
import { Person, Favorite, Visibility, Public, LocalHospital } from "@mui/icons-material";

export default function AboutPage() {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    function setModalType(arg0: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>

            <Box sx={{ background: "#f8f9fa", minHeight: "100vh", py: 5 }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        position: "relative",
                        background:
                            "linear-gradient(135deg, #673ab7 0%, #512da8 100%)",
                        color: "#fff",
                        py: 8,
                        textAlign: "center",
                        borderRadius: "0 0 2rem 2rem",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    }}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="h3" fontWeight="bold">
                            About Hozpitality
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
                            Empowering the Global Hospitality Community
                        </Typography>
                    </motion.div>
                </Box>

                <Container className="mt-5">
                    {/* Founder Section */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card
                            sx={{
                                borderRadius: 4,
                                mb: 4,
                                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    👨‍💼 Founder’s Message
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1" color="text.secondary">
                                    At Hozpitality, we are passionate about connecting the world of
                                    hospitality — from professionals to brands. Our vision is to
                                    create a seamless ecosystem for jobs, networking, and
                                    opportunities across the global hospitality industry.
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Vision Section */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card
                            sx={{
                                borderRadius: 4,
                                mb: 4,
                                background: "#ede7f6",
                                boxShadow: "0 8px 25px rgba(103,58,183,0.1)",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    <Rocket size={22} className="me-2" />
                                    Our Vision
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1" color="text.secondary">
                                    To become the world’s most trusted platform for hospitality
                                    professionals, connecting passion with opportunity and
                                    fostering growth through technology and innovation.
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Core Values */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Card
                            sx={{
                                borderRadius: 4,
                                mb: 4,
                                background: "#fff",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    <Star size={22} className="me-2" />
                                    Core Values
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Row>
                                    {[
                                        "Integrity & Trust",
                                        "Innovation & Growth",
                                        "Community First",
                                        "Respect & Inclusion",
                                    ].map((value, i) => (
                                        <Col md={6} key={i} className="mb-3">
                                            <Chip
                                                label={value}
                                                color="secondary"
                                                variant="outlined"
                                                sx={{ fontWeight: "500", width: "100%" }}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Inspirations */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Card
                            sx={{
                                borderRadius: 4,
                                mb: 4,
                                background: "#f3e5f5",
                                boxShadow: "0 8px 25px rgba(156,39,176,0.1)",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    <Lightbulb size={22} className="me-2" />
                                    Our Inspiration
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1" color="text.secondary">
                                    The hospitality industry thrives on warmth, excellence, and
                                    connection — values that inspire everything we do at
                                    Hozpitality. Our goal is to make networking, learning, and
                                    hiring effortless for everyone.
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Join Us Section */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Card
                            sx={{
                                borderRadius: 4,
                                textAlign: "center",
                                background:
                                    "linear-gradient(135deg, #7b1fa2 0%, #512da8 100%)",
                                color: "#fff",
                                py: 4,
                                boxShadow: "0 8px 30px rgba(123,31,162,0.3)",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    <Users size={22} className="me-2" />
                                    Join Our Mission
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                                    Be a part of the world’s most vibrant hospitality community.
                                    Together, let’s build a future full of opportunities.
                                </Typography>
                                <Button
                                    variant="light"
                                    className="rounded-pill px-4 py-2 fw-semibold"
                                >
                                    Join Hozpitality
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Container>
            </Box>

        </>


    );
}

