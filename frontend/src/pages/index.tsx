"use client";
import React, { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import HomeBanner from "@/components/HomeBanner";
import UrgentCause from "@/components/UrgentCause";
import FounderStoryComponent from "@/components/FounderStoryComponent";

export default function HomePage() {
    const { setTitle } = useLayout();

    useEffect(() => {
        setTitle("Home");
    }, [setTitle]);

    return (
        <>
            <HomeBanner />
            <UrgentCause/>
            <FounderStoryComponent />
        </>
    );
}