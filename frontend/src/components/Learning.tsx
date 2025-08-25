import React from "react";

export default function Learning() {
    return (
        <section className="py-5 bg-light bg-soft-golden">
            <div className="container">
                {/* Title */}
                <h2 className="text-center fw-bold mb-5 text-dark">Learning</h2>

                {/* Training Section */}
                <div className="mb-5">
                    <h4 className="text-dark mb-4">Training</h4>
                    <div className="row g-4">
                        {["Compassion in Care", "Holistic Healing", "Community Engagement"].map(
                            (topic, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="p-4 bg-white border rounded-3 shadow-sm h-100 text-center d-flex flex-column justify-content-center">
                                        <h5 className="fw-semibold mb-3">{topic}</h5>
                                        <button className="btn btn-outline-secondary" disabled>
                                            Coming Soon
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Resource Library */}
                <div>
                    <h4 className="text-dark mb-4">Resource Library</h4>
                    <div className="row g-4">
                        {/* Sample 3 PDFs */}
                        {[
                            { name: "Patient Starter Guide", link: "https://example.com/patient-starter-guide.pdf" },
                            { name: "Caregiver Support Handbook", link: "https://example.com/caregiver-support-handbook.pdf" },
                            { name: "Daily Practices for Calm", link: "https://example.com/daily-practices-for-calm.pdf" }
                        ].map((pdf, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="p-3 bg-white border rounded-3 shadow-sm h-100 d-flex align-items-center">
                                    <i className="bi bi-file-earmark-pdf fs-2 text-danger me-3"></i>
                                    <a
                                        href={pdf.link}
                                        className="text-dark text-decoration-none fw-semibold"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {pdf.name}.pdf
                                    </a>
                                </div>
                            </div>
                        ))}

                        {/* Sample 3 Infographics */}
                        {["Cancer Awareness", "Healthy Living Tips", "Support Network"].map(
                            (info, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="p-3 bg-white border rounded-3 shadow-sm h-100 d-flex align-items-center">
                                        <i className="bi bi-image fs-2 text-info me-3"></i>
                                        <a href="https://example.com/caregiver-support-handbook.pdf" className="text-dark text-decoration-none fw-semibold">
                                            {info}.png
                                        </a>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* Nas.io CTA */}
                    <div className="text-center mt-5">
                        <a
                            href="https://nas.io/prankiran-ray-of-vitality"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-golden px-4 py-2 fw-semibold"
                        >
                            Join our Monthly Learning Series →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
