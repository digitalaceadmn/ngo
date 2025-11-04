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
import Consultations from "@/assets/images/Home/Consultations.jpg";
import Patients from "@/assets/images/Home/Patients.jpg";
import Travel from "@/assets/images/Home/Kilometers.jpg";
import { Container, Row, Col } from "react-bootstrap";

type Cause = {
    id: number;
    numbers: string; // ✅ Changed from number to string
    title: string;
    image: string;
    color: "error" | "warning" | "success";
};

const causes: Cause[] = [
    {
        id: 1,
        numbers: "1,250+",
        title: "Consultations Completed",
        image: Consultations.src,
        color: "error",
    },
    {
        id: 2,
        numbers: "950+",
        title: "Patients Helped",
        image: Patients.src,
        color: "warning",
    },
    {
        id: 3,
        numbers: "25,000+",
        title: "Kilometers of Travel Saved",
        image: Travel.src,
        color: "success",
    },
];

const ImpactTeaser = () => {
    return (
        <section style={{ padding: "60px 0" }}>
            <Container>
                {/* Section Title */}
                <Row className="text-center mb-5">
                    <Col>
                        <motion.h6
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold display-5 text-success"
                        >
                            Impact Teaser
                        </motion.h6>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <Box
                                sx={{
                                    width: 60,
                                    height: 3,
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
                        <Typography variant="h4" sx={{ mb: 2, lineHeight: 1.3 }}>
                            Our work is already making a measurable difference
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

                        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                            This model not only improves health outcomes but also reduces costs,
                            saves time, and builds capacity in rural healthcare systems.
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
                            {causes.map((cause) => (
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
                                                    variant="h4"
                                                    sx={{
                                                        color: `${cause.color}.main`,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {cause.numbers}
                                                </Typography>

                                                <Typography className="text-black small fw-semibold" variant="h6" sx={{ mt: 1 }}>
                                                    {cause.title}
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

export default ImpactTeaser;
