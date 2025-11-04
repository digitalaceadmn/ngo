"use client";

import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import Specialists from "@/assets/images/Home/Specialists.jpg";
import RuralGps from "@/assets/images/Home/Ruralgps.jpg";
import Patients from "@/assets/images/Home/Patients.jpg";
import { Container, Row, Col } from "react-bootstrap";

type Cause = {
    id: number;
    title: string;
    description: string;
    image: string;
};

const causes: Cause[] = [
    {
        id: 1,
        title: "Specialists",
        description: "Share knowledge & guide complex cases.",
        image: Specialists.src,
    },
    {
        id: 2,
        title: "Rural GPs",
        description:
            "Get expert support, upgrade their skills, and provide better care locally.",
        image: RuralGps.src,
    },
    {
        id: 3,
        title: "Patients",
        description:
            "Receive improved, faster, and more affordable treatment without traveling long distances.",
        image: Patients.src,
    },
];

const OurSolution = () => {
    return (
        <section style={{ padding: "60px 0" }}>
            <Container>
                {/* Section Title */}
                <Row className="text-center mb-5">
                    <Col>
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold display-5 text-success"
                        >
                            Our Solution
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <Box
                                sx={{
                                    width: 70,
                                    height: 4,
                                    backgroundColor: "success.main",
                                    borderRadius: 3,
                                    mt: 1,
                                }}
                            />
                        </motion.div>
                    </Col>
                </Row>

                <Row className="align-items-center g-5">
                    {/* Left Content */}
                    <Col xs={12} md={4}>
                        <Typography
                            variant="h4"
                            sx={{ mb: 2, lineHeight: 1.3, fontWeight: "bold" }}
                        >
                            Doctor-to-Doctor Model
                        </Typography>

                        <Box
                            sx={{
                                width: 60,
                                height: 3,
                                backgroundColor: "success.main",
                                borderRadius: 3,
                                mb: 3,
                            }}
                        />

                        <Typography
                            className="text-black small fw-semibold"
                            variant="subtitle1"
                            sx={{ mb: 2 }}
                        >
                            How it works?
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{ mb: 4, color: "text.secondary" }}
                        >
                            We empower local healthcare providers with the guidance and
                            expertise of specialists, ensuring patients in underserved areas
                            receive timely and accurate care.
                        </Typography>

                        <Button
                            className="rounded-pill"
                            variant="contained"
                            sx={{
                                backgroundColor: "primary.main",
                                px: 4,
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: 2,
                                boxShadow: 2,
                                "&:hover": { backgroundColor: "primary.dark" },
                            }}
                        >
                            Read More
                        </Button>
                    </Col>

                    {/* Right Cards */}
                    <Col xs={12} md={8}>
                        <Row className="g-4">
                            {causes.map((cause, index) => (
                                <Col xs={12} sm={6} md={4} key={cause.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: cause.id * 0.2 }}
                                    >
                                        <Card
                                            className="shadow-sm"
                                            sx={{
                                                borderRadius: 3,
                                                overflow: "hidden",
                                                height: "100%",
                                            }}
                                        >
                                            <Box sx={{ overflow: "hidden" }}>
                                                <CardMedia
                                                    component="img"
                                                    className="image-card"
                                                    image={cause.image}
                                                    alt={cause.title}
                                                    sx={{
                                                        transition: "transform 0.4s ease",
                                                        "&:hover": {
                                                            transform: "scale(1.1)",
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            <CardContent>
                                                <Typography
                                                    variant="h6"
                                                    className="text-black small fw-semibold"
                                                >
                                                    {cause.title}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {cause.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default OurSolution;
