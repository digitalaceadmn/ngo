"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Banner from "@/assets/images/founder-bg.png";
import { Sparkles, Heart, BookOpen } from "lucide-react";

const FounderComponent = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="position-relative d-flex align-items-center"
      style={{
        height: "120vh",
        backgroundImage: `url('${Banner.src}')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        justifyContent: "flex-start",
      }}
    >
      <div
        className="position-relative z-1 d-flex flex-column justify-content-center"
        style={{
          maxWidth: "700px",
          padding: "2rem",
          background: "rgba(0,0,0,0.55)",
          borderRadius: "16px",
        }}
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="fw-bold mb-3 text-light"
          style={{ fontSize: "2.3rem", lineHeight: "1.3" }}
        >
          <Sparkles className="text-warning me-2" size={30} />
          The Journey of PranKiran
        </motion.h2>

        {/* Paragraph 1 */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={showContent ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="fs-5 text-light"
        >
          When <span className="fw-semibold text-warning">Himanshu Tiwari</span>{" "}
          saw cancer affect his loved ones, he realized healing begins before
          medicine — with{" "}
          <span className="fw-semibold text-info">courage, compassion, and connection</span>.
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.4 }}
          className="border-start border-3 border-warning ps-3 fst-italic text-light my-4"
        >
          “True healing is found in human bonds, small acts of care, and knowing
          you’re never alone.”
        </motion.blockquote>

        {/* Paragraph 2 */}
        <motion.p
          initial={{ opacity: 0, x: 40 }}
          animate={showContent ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="fs-5 text-light"
        >
          Out of this calling,{" "}
          <span className="fw-bold text-warning">PranKiran – Ray of Vitality</span>{" "}
          was born: a space for emotional support, caregiver strength, and
          stories of hope.
        </motion.p>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-4"
        >
          <h5 className="text-warning fw-bold mb-3">
            <BookOpen className="me-2" size={22} /> The Philosophy
          </h5>
          <ul className="fs-6 text-light">
            <li>
              <strong>“Pran”</strong> – breath of life.
            </li>
            <li>
              <strong>“Kiran”</strong> – ray of light.
            </li>
            <li>
              Together, they mean dignity, vitality & compassion.
            </li>
          </ul>
        </motion.div>

        {/* Founder Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-4"
        >
          <h5 className="text-warning fw-bold">Founder</h5>
          <h6 className="fst-italic text-light">— Himanshu Tiwari</h6>
          <Heart className="text-danger mt-2" size={26} />
        </motion.div>
      </div>
    </section>
  );
};

export default FounderComponent;
