export default function MissionAndVision() {
    return (
        <>
            <section className="mission-and-vision py-5 bg-soft-golden">
                <div className="container">
                    {/* Section Heading */}
                    <h2 className="text-center mb-5 text-dark-golden">
                        Mission & Vision
                    </h2>

                    <div className="row align-items-center">
                        {/* Left: Video */}
                        <div className="col-md-6 border p-0">
                            {/* Replace with actual video embed */}
                            <div className="ratio ratio-16x9 rounded shadow">
                                <iframe
                                    src="https://www.youtube.com/embed/your-video-id"
                                    title="Founder Video"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Right: Mission Text + Lifeline Quote + CTA */}
                        <div className="col-md-6 text-center fw-bold">
                            <p className="mb-3 fs-5 text-dark">
                                We strive to bring compassion, innovation, and resilience together—
                                creating a space where every life has the chance to thrive.
                            </p>

                            <blockquote className="blockquote mb-3">
                                <p className="fst-italic text-golden fs-4">
                                    “This is not just a website. It’s a lifeline.”
                                </p>
                            </blockquote>

                            {/* Highlight Tile */}
                            <div className="p-4 bg-golden text-white rounded-3 shadow-lg d-inline-block">
                                <h4 className="mb-2 text-white">Join Our Community</h4>
                                <p className="mb-3 fw-normal">
                                    Be part of a movement that uplifts lives every day.
                                </p>
                                <a
                                    href="https://help.nas.io/en/articles/8499525-pt-br-como-convidar-novos-membros "
                                    className="btn btn-light text-golden fw-semibold px-4"
                                >
                                    Get Involved
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
