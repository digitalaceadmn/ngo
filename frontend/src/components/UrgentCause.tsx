"use client";

import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

type Cause = {
    id: number;
    title: string;
    description: string;
    image: string;
    color: "error" | "warning" | "success";
};

const causes: Cause[] = [
    {
        id: 1,
        title: "Specialists",
        description: "Share knowledge & guide complex cases.",
        image: "https://medicircle.in/uploads/2023/august2023/firefox_ylsxylos2o.png",
        color: "error",
    },
    {
        id: 2,
        title: "Rural GPs",
        description:
            "Get expert support, upgrade their skills, and provide better care locally.",
        image: "https://medicircle.in/uploads/2023/august2023/firefox_ylsxylos2o.png",
        color: "warning",
    },
    {
        id: 3,
        title: "Patients",
        description:
            "Receive improved, faster, and more affordable treatment without traveling long distances.",
        image: "https://medicircle.in/uploads/2023/august2023/firefox_ylsxylos2o.png",
        color: "success",
    },
];

const UrgentCause = () => {
    return (
        <section style={{ padding: "60px 0" }}>
            <Container>
                <Row className="text-center mb-3">
                    <Col>
                        <motion.h6
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fw-bold display-5 text-success"
                        >
                            Our Solution
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
                                    mb: 3,
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
                            sx={{ mb: 2, lineHeight: 1.3 }}
                        >
                            Doctor-to-Doctor Model
                        </Typography>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Box
                                sx={{
                                    width: 60,
                                    height: 3,
                                    backgroundColor: "success.main",
                                    borderRadius: 3,
                                    mb: 3,
                                }}
                            />
                        </motion.div>

                        <Typography className="text-black" variant="h6" sx={{ mb: 2 }}>
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
                                "&:hover": { backgroundColor: "error.dark" },
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
                                    <Card
                                        className="shadow-sm"
                                        sx={{
                                            borderRadius: 3,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="160"
                                            image={cause.image}
                                            alt={cause.title}
                                        />

                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                className="text-black"
                                                variant="h6"
                                                sx={{ mb: 1 }}
                                            >
                                                {cause.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 2 }}
                                            >
                                                {cause.description}
                                            </Typography>

                                            {/* <Button
                                                fullWidth
                                                variant="contained"
                                                color={cause.color}
                                                sx={{
                                                    fontWeight: "bold",
                                                    borderRadius: 2,
                                                    py: 1,
                                                }}
                                            >
                                                DONATE NOW
                                            </Button> */}
                                        </CardContent>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default UrgentCause;
