"use client";

import { Row, Col } from "react-bootstrap";
import { FaUserMd, FaProcedures, FaHandsHelping, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const resources = [
    {
        icon: <FaUserMd size={42} className="text-warning" />,
        title: "Find Doctors",
        desc: "Connect with trusted oncologists near you.",
        link: "#doctors",
        btn: "Explore",
    },
    {
        icon: <FaProcedures size={42} className="text-warning" />,
        title: "Treatment Options",
        desc: "Understand therapies and treatment pathways.",
        link: "#treatment",
        btn: "Learn More",
    },
    {
        icon: <FaHandsHelping size={42} className="text-warning" />,
        title: "Support Groups",
        desc: "Find communities for emotional & peer support.",
        link: "#support",
        btn: "Join Now",
    },
    {
        icon: <FaQuestionCircle size={42} className="text-warning" />,
        title: "FAQs",
        desc: "Get answers to common questions on care.",
        link: "#faq",
        btn: "Read FAQs",
    },
];

const QuickHelpMenu = () => {
    return (
        <section className="py-5 bg-light position-relative">
            <div className="container">
                <h2 className="text-center mb-5 fw-bold text-dark">
                    Quick Help & Resources
                </h2>

                <Row className="g-4">
                    {resources.map((item, index) => (
                        <Col key={index} xs={12} sm={6} lg={3}>
                            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="quick-card rounded-4 p-4 text-center bg-white bg-opacity-75 shadow-sm border border-light shadow-lg"
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center mb-3 rounded-circle bg-gradient text-white shadow"
                                        style={{ width: "70px", height: "70px", margin: "0 auto" }}
                                    >
                                        {item.icon}
                                    </div>
                                    <h5 className="fw-semibold mb-2">{item.title}</h5>
                                    <p className="text-muted small mb-4">{item.desc}</p>
                                    <a
                                        href={item.link}
                                        className="btn btn-warning text-white px-4 rounded-pill"
                                    >
                                        {item.btn}
                                    </a>
                                </motion.div>
                            </Tilt>
                        </Col>
                    ))}
                </Row>
            </div>

            <style jsx>{`
        .quick-card {
          transition: all 0.3s ease;
        }
        .quick-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
        </section>
    );
};

export default QuickHelpMenu;
