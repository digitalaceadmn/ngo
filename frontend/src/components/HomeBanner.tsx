import Banner from "@/assets/images/banner.jpg";

const HomeBanner = () => {
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
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-black" style={{ opacity: 0.6 }} />

            {/* Content */}
            <div className="position-relative z-1 container " style={{ maxWidth: "80%", padding: "2rem", borderRadius: "1rem" , background: "#fffbeb7d" }}>
                <h1 className="fw-bold mb-3 text-black">
                    Prankiran – Guiding Cancer Patients Towards the Right Care
                </h1>

                {/* Golden line */}
                <div className="mx-auto mb-4 bg-golden" style={{ width: "180px", height: "6px", borderRadius: "8px" }} />

                <p className="mb-4">
                    We stand beside patients, helping them find trusted doctors and access the
                    treatment they deserve.
                </p>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn-golden px-4">MEET DOCTORS</button>
                    <button className="btn-outline-golden px-4 text-white">CONTACT US</button>
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;
