import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    LinearProgress,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap"; // Bootstrap grid

type Cause = {
    id: number;
    title: string;
    description: string;
    raised: number;
    goal: number;
    image: string;
    color: "error" | "warning" | "success";
};

const causes: Cause[] = [
    {
        id: 1,
        title: "Water For All Children",
        description:
            "You believe, as we do, that every child deserves a future. Every last child.",
        raised: 87689,
        goal: 87689,
        image: "/cause1.jpg",
        color: "error",
    },
    {
        id: 2,
        title: "Protecting Children",
        description:
            "You believe, as we do, that every child deserves a future. Every last child.",
        raised: 89679,
        goal: 89286,
        image: "/cause2.jpg",
        color: "warning",
    },
    {
        id: 3,
        title: "The Rights of Children",
        description:
            "You believe, as we do, that every child deserves a future. Every last child.",
        raised: 97679,
        goal: 97679,
        image: "/cause3.jpg",
        color: "success",
    },
];

const UrgentCause = () => {
    return (
        <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
            <Container>
                <Row className="align-items-center g-5">
                    {/* Left Content */}
                    <Col xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "error.main", fontWeight: 600, mb: 1 }}
                        >
                            Urgent cause
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mb: 2, lineHeight: 1.3 }}
                        >
                            We Help More Than <br />
                            <Box component="span" sx={{ color: "primary.main" }}>
                                9k Children
                            </Box>{" "}
                            Every Year
                        </Typography>

                        {/* Yellow underline */}
                        <Box
                            sx={{
                                width: 40,
                                height: 6,
                                backgroundColor: "orange",
                                borderRadius: 3,
                                mb: 3,
                            }}
                        />

                        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                            BigHearts is the largest global crowdfunding community
                            connecting nonprofits, donors, and companies in nearly every
                            country. We help nonprofits from around the world.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "error.main",
                                px: 4,
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: 2,
                                boxShadow: 2,
                                "&:hover": { backgroundColor: "error.dark" },
                            }}
                        >
                            VIEW ALL CAUSES
                        </Button>
                    </Col>

                    {/* Right Cards */}
                    <Col xs={12} md={8}>
                        <Row className="g-4">
                            {causes.map((cause) => (
                                <Col xs={12} sm={6} md={4} key={cause.id}>
                                    <Card
                                        sx={{
                                            borderRadius: 3,
                                            boxShadow: 3,
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
                                                variant="h6"
                                                fontWeight="bold"
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

                                            <Typography variant="body2" fontWeight="bold">
                                                Raised : ${cause.raised.toLocaleString()}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                sx={{ mb: 1 }}
                                            >
                                                Goal : ${cause.goal.toLocaleString()}
                                            </Typography>

                                            <LinearProgress
                                                variant="determinate"
                                                value={(cause.raised / cause.goal) * 100}
                                                color={cause.color}
                                                sx={{ height: 8, borderRadius: 5, mb: 2 }}
                                            />

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color={cause.color}
                                                sx={{
                                                    fontWeight: "bold",
                                                    borderRadius: 2,
                                                    py: 1,
                                                }}
                                            >
                                                DONATION NOW
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Box>
    );
};

export default UrgentCause;
