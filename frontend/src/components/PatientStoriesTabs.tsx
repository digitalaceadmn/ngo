"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import StoryCard, { ContentItem } from "./StoryCard";

const TABS = [
    { key: "stories", label: "Stories" },
    { key: "quotes", label: "Quotes" },
    { key: "group", label: "Group Discussions" },
    { key: "p2p", label: "Peer-to-Peer" },
] as const;

type TabKey = typeof TABS[number]["key"];

const sampleData: Record<TabKey, ContentItem[]> = {
    stories: [
        {
            id: "s-101",
            title: "Beating Stage II Lymphoma",
            excerpt: "Chemo, community, and courage.",
            image: "/images/p1.jpg",
            type: "story",
        },
        {
            id: "s-102",
            title: "Life After Surgery",
            excerpt: "Recovery tips that actually helped.",
            image: "/images/p2.jpg",
            type: "story",
        },
        {
            id: "s-103",
            title: "Managing Chronic Pain",
            excerpt: "Small habits, big changes.",
            image: "/images/p3.jpg",
            type: "story",
        },
    ],
    quotes: [],
    group: [],
    p2p: [],
};

export default function PatientStoriesTabs() {
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState<TabKey>("stories");

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const items = sampleData[active];

    return (
        <section className="py-5 bg-light overflow-hidden bg-soft-golden">
            <div className="container">
                {/* Title */}
                <h2 className="text-center mb-5 text-dark fw-bold">
                    Real Stories of Hope
                </h2>

                {/* Tabs */}
                <div className="flex gap-3 flex-wrap justify-center mb-6">
                    {TABS.map((t) => {
                        const selected = active === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setActive(t.key)}
                                className={`px-5 py-2 rounded-full border fw-semibold transition-all duration-300
                  ${selected
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                                        : "bg-white text-dark border-secondary"
                                    }`}
                                aria-pressed={selected}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                {active === "stories" && items.length > 0 ? (
                    <div className="patient-swiper animate-slide-left">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, A11y]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            loop={true}
                            speed={700}
                            spaceBetween={24}
                            breakpoints={{
                                0: { slidesPerView: 1.05 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            a11y={{ prevSlideMessage: "Previous", nextSlideMessage: "Next" }}
                        >
                            {items.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <StoryCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="text-center text-muted py-5 fw-semibold">
                        🚧 Coming Soon 🚧
                    </div>
                )}
            </div>

            {/* CSS Animation */}
            <style jsx>{`
        .animate-slide-left {
          animation: slideInLeft 1s ease-in-out;
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </section>
    );
}
