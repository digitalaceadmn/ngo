import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function JoinTheMovement() {
    const [showDonate, setShowDonate] = useState(false);
    const [showVolunteer, setShowVolunteer] = useState(false);

    return (
        <section className="py-5">
            <div className="container text-center">
                {/* Title */}
                <h2 className="text-dark fw-bold mb-5">Join the Movement</h2>

                <div className="row g-4">
                    {/* Volunteer Form */}
                    <div className="col-md-4">
                        <div className="p-4 bg-white border border-golden rounded-3 shadow-sm h-100 d-flex flex-column justify-content-between">
                            <h4 className="text-dark mb-3">Volunteer With Us</h4>
                            <p className="text-muted">
                                Lend your time, skills, and compassion to support patients and caregivers.
                            </p>
                            <Button 
                                onClick={() => setShowVolunteer(true)} 
                                className="btn btn-golden mt-3"
                            >
                                Fill Volunteer Form
                            </Button>
                        </div>
                    </div>

                    {/* Donation Box (highlighted) */}
                    <div className="col-md-4">
                        <div className="p-4 bg-golden text-dark rounded-3 shadow-lg h-100 d-flex flex-column justify-content-between">
                            <h4 className="mb-3 text-white">Support with a Donation</h4>
                            <p>
                                Every contribution is a lifeline—help us bring hope and care to more lives.
                            </p>
                            {/* keep button color same */}
                            <Button 
                                onClick={() => setShowDonate(true)} 
                                className="btn btn-light text-golden fw-semibold mt-3 background-white"
                            >
                                Donate Now
                            </Button>
                        </div>
                    </div>

                    {/* Partner With Us */}
                    <div className="col-md-4">
                        <div className="p-4 bg-white border border-golden rounded-3 shadow-sm h-100 d-flex flex-column justify-content-between">
                            <div className="mb-3 d-flex justify-content-center">
                                <i className="bi bi-handshake fs-1 text-golden"></i>
                            </div>
                            <h4 className="text-dark mb-3">Partner With Us</h4>
                            <p className="text-muted">
                                Collaborate with us to create sustainable impact and lasting change.
                            </p>
                            <a href="/partner" className="btn btn-outline-golden mt-3">
                                Become a Partner
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Volunteer Modal */}
            <Modal show={showVolunteer} onHide={() => setShowVolunteer(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Volunteer With Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group text-start">
                        <li className="list-group-item">
                            🌱 <strong>Patient Support</strong> – Guidance, resources & medicines.
                        </li>
                        <li className="list-group-item">
                            🌸 <strong>Community Care</strong> – Emotional support through shared journeys.
                        </li>
                        <li className="list-group-item">
                            🌟 <strong>Awareness & Learning</strong> – Monthly sessions & knowledge resources.
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <a href="/volunteer" className="btn btn-golden">
                        Proceed to Volunteer Form
                    </a>
                </Modal.Footer>
            </Modal>

            {/* Donate Modal */}
            <Modal show={showDonate} onHide={() => setShowDonate(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Ways to Donate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="list-group text-start">
                        <a href="/donate" className="list-group-item list-group-item-action">
                            💳 <strong>Online Payment</strong> <br />
                            <small>(UPI / Card / Netbanking)</small>
                        </a>
                        <div className="list-group-item">
                            🏦 <strong>Bank Transfer</strong> <br />
                            <small>Account details will be shared upon request.</small>
                        </div>
                        <div className="list-group-item">
                            🌐 <strong>International Donors</strong> <br />
                            <small>Secure donation link coming soon.</small>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDonate(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}
