import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Person from "@/assets/images/person.png"

const founders = [
    {
        name: "John Doe",
        role: "Founder & CEO",
        image: "/images/founders/founder1.jpg",
        story:
            "John started this journey with a vision to simplify hiring processes for global companies.",
    },
    {
        name: "Jane Smith",
        role: "Co-Founder & CTO",
        image: "/images/founders/founder2.jpg",
        story:
            "Jane leads the tech innovation, ensuring the platform stays ahead with cutting-edge features.",
    },
    {
        name: "Mark Johnson",
        role: "Head of Operations",
        image: "/images/founders/founder3.jpg",
        story:
            "Mark focuses on building strong partnerships and streamlining internal operations.",
    },
    {
        name: "Emily Davis",
        role: "Chief Marketing Officer",
        image: "/images/founders/founder4.jpg",
        story:
            "Emily drives brand growth through innovative marketing strategies and storytelling.",
    },
    {
        name: "Michael Lee",
        role: "Investor & Advisor",
        image: "/images/founders/founder5.jpg",
        story:
            "Michael brings strategic insights and financial expertise to scale the company globally.",
    },
];

const FounderStoryComponent = () => {
    return (
        <section className="py-5 bg-dark text-white">
            <Container>
                <h2 className="text-center mb-4 text-white">Our Founders</h2>

                <div id="founderCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {founders.map((founder, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <Row className="align-items-center">
                                    <Col md={5} className="text-center">
                                        <Image
                                            src={Person.src}
                                            alt={founder.name}
                                            width={400}
                                            height={400}
                                            className="d-block mx-auto rounded-circle border border-4 border-golden"
                                        />
                                    </Col>
                                    <Col md={7}>
                                        <p className="mt-3">{founder.story}</p>
                                        <h5 className="text-golden fw-bold">{founder.role}</h5>
                                        <h6 className="fst-italic">— {founder.name}</h6>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Controls */}
                    <button
                        className="carousel-control-prev custom-carousel-btn"
                        type="button"
                        data-bs-target="#founderCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                        className="carousel-control-next custom-carousel-btn"
                        type="button"
                        data-bs-target="#founderCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default FounderStoryComponent;
