import React from "react";
import Logo from "@/assets/images/logo.png";

const navLinks = ["Home", "Causes", "Events", "Portfolio", "Pages", "Blog"];

const MainHeader: React.FC = () => {
    return (
        <header className="sticky-top bg-light border-bottom border-golden shadow-sm">
            <div className="container d-flex align-items-center justify-content-between py-3">
                {/* Logo */}
                <div className="d-flex align-items-center">
                    <img
                        src={Logo.src ?? Logo}
                        alt="PranKiran Logo"
                        width={220}
                        height={80}
                        style={{ objectFit: "contain" }}
                    />
                </div>

                {/* Navigation Links */}
                <nav className="d-flex gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            className={`text-decoration-none ${
                                link === "Home" ? "text-dark-golden fw-bold" : "text-dark"
                            }`}
                            onMouseOver={(e) => e.currentTarget.classList.add("text-golden")}
                            onMouseOut={(e) =>
                                e.currentTarget.classList.toggle("text-golden", link === "Home")
                            }
                        >
                            {link}
                        </a>
                    ))}
                </nav>

                {/* Right Side Icons + Button */}
                <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-link text-dark p-0 fs-5">🔍</button>
                    <button className="btn btn-link text-dark p-0 fs-5">👤</button>
                    <button className="btn-primary shadow-sm">Meet Doctors</button>
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
