import React, { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import Banner from "@/assets/images/banner.png";

export default function AboutPage() {
    const { setTitle } = useLayout();

    useEffect(() => {
        setTitle("About");
    }, [setTitle]);

    return (
        <section
            className="position-relative d-flex align-items-center justify-content-center text-center text-white"
            style={{
                height: "90vh",
                backgroundImage: `url('${Banner.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ opacity: 0.6 }} />

            {/* Content */}
            <div className="position-relative z-1 container bg-white py-4 bg-soft-golden" style={{ maxWidth: "80%" }}>
                <h1 className="fw-bold mb-3 text-golden">
                    About Us
                </h1>

                <p className="mb-4 font-bolder font-size-larger">
                    We stand beside patients, helping them find trusted doctors and access the
                    treatment they deserve. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, sit neque elige
                </p>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn-golden px-4">Learn More</button>
                </div>
            </div>
        </section>
    );
}
