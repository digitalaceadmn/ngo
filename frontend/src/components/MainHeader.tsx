import React from "react";
import Logo from "@/assets/images/logo-t.png";
import Link from "next/link";

const navLinks = [
    { name: "Home", path: "/" },
    // { name: "Causes", path: "/causes" },
    // { name: "Events", path: "/events" },
    // { name: "Portfolio", path: "/portfolio" },
    { name: "About Us", path: "/about-us" },
    { name: "Model", path: "/model" },
    { name: "Contact", path: "/contact-us" },
];

const MainHeader: React.FC = () => {
    return (
        <header
            className="sticky-top border-bottom border-golden shadow-sm"
            style={{
                backgroundColor: "#0a1f44",
                boxShadow:
                    "rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px !important" ,
            }}
        >
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
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`text-decoration-none ${link.name === "Home" ? "text-dark-golden fw-bold" : "text-white"
                                }`}
                            onMouseOver={(e) =>
                                e.currentTarget.classList.add("text-golden")
                            }
                            onMouseOut={(e) =>
                                e.currentTarget.classList.toggle(
                                    "text-golden",
                                    link.name === "Home"
                                )
                            }
                        >
                            {link.name}
                        </Link>
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
