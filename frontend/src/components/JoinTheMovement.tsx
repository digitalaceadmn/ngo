import React from "react";

export default function JoinTheMovement() {
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
                            <a href="/volunteer" className="btn btn-golden mt-3">
                                Fill Volunteer Form
                            </a>
                        </div>
                    </div>

                    {/* Donation Box (highlighted) */}
                    <div className="col-md-4">
                        <div className="p-4 bg-golden text-dark rounded-3 shadow-lg h-100 d-flex flex-column justify-content-between">
                            <h4 className="mb-3">Support with a Donation</h4>
                            <p>
                                Every contribution is a lifeline—help us bring hope and care to more lives.
                            </p>
                            <a href="/donate" className="btn btn-light text-golden fw-semibold mt-3">
                                Donate Now
                            </a>
                        </div>
                    </div>

                    {/* Partner With Us (using Bootstrap Icons) */}
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
        </section>
    );
}
