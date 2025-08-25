import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { EmojiObjects, Visibility, Stars } from "@mui/icons-material";
import missionIcon from "@/assets/images/mission.png";

const MissionVisionValues = () => {
    return (
        <section className="py-16 bg-white text-center">
            <Container>
                <h2 className="text-4xl font-bold mb-12 text-gold">
                    Our Mission, Vision & Values
                </h2>
                <Row className="g-4">
                    {/* Mission */}
                    <Col md={4}>
                        <div className="p-6 shadow-lg rounded-3xl h-100 hover:shadow-xl transition-all">
                            <div className="mb-4 d-flex justify-content-center">
                                <img src={missionIcon.src} alt="Mission" style={{ width: "160px" }} />
                            </div>
                            <h3 className="fw-bold text-danger mb-3">OUR MISSION</h3>
                            <p>
                                To empower cancer patients with access to reliable resources, trusted doctors,
                                and compassionate support every step of their journey.
                            </p>
                        </div>
                    </Col>

                    {/* Vision */}
                    <Col md={4}>
                        <div className="p-6 shadow-lg rounded-3xl h-100 hover:shadow-xl transition-all">
                            <div className="mb-4 d-flex justify-content-center">
                                <img src="/images/ourvision2.png" alt="Vision" style={{ width: "150px", height: "125px" }} />

                            </div>
                            <h3 className="fw-bold text-info mb-3">OUR VISION</h3>
                            <p>
                                To create a world where no one faces cancer alone and every patient receives
                                timely, dignified, and advanced care.
                            </p>
                        </div>
                    </Col>

                    {/* Values */}
                    <Col md={4}>
                        <div className="p-6 shadow-lg rounded-3xl h-100 hover:shadow-xl transition-all">
                            <div className="mb-4 d-flex justify-content-center">
                                <img src="/images/ourvalues2.png" alt="Values" style={{ width: "150px", height: "125px" }} />
                            </div>
                            <h3 className="fw-bold text-warning mb-3">OUR VALUES</h3>
                            <p>
                                We stand on compassion, integrity, and innovation—ensuring that patients and
                                their families always find hope and strength within our community.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MissionVisionValues;
