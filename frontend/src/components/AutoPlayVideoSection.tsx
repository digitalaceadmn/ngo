"use client";
import React from "react";
import { Container } from "react-bootstrap";

const AutoPlayVideoSection = () => {
    return (
        <section className="video-section position-relative text-center text-white mb-4">
            {/* Background Video */}
            <video
                className="video-bg"
                src="/videos/sample1.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay */}
            <div className="video-overlay position-absolute top-0 start-0 w-100 h-100"></div>

            {/* Content */}
            <Container className="position-relative z-2 d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="display-5 fw-bold mb-3">Guided Consultation</h1>
                <p className="lead mb-4 text-white">
                     Impact stories, survivor experiences, volunteer activities, with ability for community to share/join campaigns.
                </p>
                <a href="/" className="btn btn-light px-4 py-2 rounded-pill fw-semibold">
                    Partner With Us
                </a>
            </Container>

            <style jsx>{`
        .video-section {
          position: relative;
          height: 80vh;
          overflow: hidden;
          border-radius: 20px;
        }

        .video-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .video-overlay {
          background: rgba(0, 0, 0, 0.5);
          z-index: 2;
        }

        .z-2 {
          z-index: 3;
        }
      `}</style>
        </section>
    );
};

export default AutoPlayVideoSection;
