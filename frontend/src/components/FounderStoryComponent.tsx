import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Person from "@/assets/images/person.png";

const founders = [
    {
        name: "John Doe",
        role: "Founder & CEO",
        image: "/images/founders/founder1.jpg",
        story: "<p>When Himanshu Tiwari witnessed the impact of cancer within his own circle, he realized that treatment begins long before the first prescription. It begins with courage, compassion, and connection. Watching loved ones struggle—not only with the illness, but with silence, fear, and isolation—he felt a calling to create a space where no one has to face the journey alone.</p>",
    }
];

const FounderStoryComponent = () => {
    return (
        <section className="py-5">
            <Container>
                <h2 className="text-center mb-5 text-dark-golden">✨ Our Founders</h2>

                <div id="founderCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {founders.map((founder, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <Row className="align-items-center founder-story">
                                    {/* Founder Image */}
                                    <Col md={5} className="text-center">
                                        <Image
                                            src={Person.src}
                                            alt={founder.name}
                                            width={350}
                                            height={350}
                                            className="d-block mx-auto rounded-circle border border-4 border-golden shadow-sm"
                                        />
                                    </Col>

                                    {/* Founder Story */}
                                    <Col md={7} className="mt-4 mt-md-0">
                                        <h4 className="fw-bold text-dark mb-3">The Journey of PranKiran</h4>

                                        <p className="fs-5 text-muted">
                                            When <span className="fw-semibold text-dark">Himanshu Tiwari</span> witnessed
                                            the impact of cancer within his own circle, he realized that treatment begins
                                            long before the first prescription. It begins with <span className="text-dark-golden">courage, compassion, and connection</span>.
                                        </p>

                                        <blockquote className="border-start border-3 border-golden ps-3 fst-italic text-secondary my-3">
                                            “Healing is more than medicine — it is human connection, small acts of care,
                                            and a reminder that you are never alone.”
                                        </blockquote>

                                        <p className="fs-5 text-muted">
                                            Watching loved ones struggle not only with the illness, but with silence,
                                            fear, and isolation, Himanshu felt a calling to create a space where no one
                                            has to face the journey alone. That calling became <span className="fw-bold text-dark">PranKiran – Ray of Vitality</span>.
                                        </p>

                                        <h5 className="mt-4 text-dark fw-bold">🌟 The Philosophy</h5>
                                        <ul className="fs-6 text-muted">
                                            <li><strong>“Pran”</strong> (life breath) – the essence of being.</li>
                                            <li><strong>“Kiran”</strong> (ray of light) – hope in the darkest times.</li>
                                            <li>Together, they represent vitality, dignity, and compassion.</li>
                                        </ul>

                                        <p className="fs-5 text-muted mt-3">
                                            Under his leadership, PranKiran was designed as an early emotional support
                                            system for patients and caregivers. Through guided check-ins, caregiver
                                            empowerment, and community storytelling, his vision is to bring calm and
                                            dignity into lives disrupted by cancer.
                                        </p>

                                        <h5 className="text-dark-golden fw-bold mt-4">{founder.role}</h5>
                                        <h6 className="fst-italic text-secondary">— {founder.name}</h6>
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
                        data-bs-slide="prev">
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
