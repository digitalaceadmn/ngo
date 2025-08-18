"use client";
import React, { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import HomeBanner from "@/components/HomeBanner";
import UrgentCause from "@/components/UrgentCause";
import FounderStoryComponent from "@/components/FounderStoryComponent";
import MissionVision from "@/components/MissionVision";
import CancerJourney from "@/components/CancerJourney";
import QuickHelpMenu from "@/components/QuickHelpMenu";
import Footer from "@/components/Footer";

export default function HomePage() {
    const { setTitle } = useLayout();

    useEffect(() => {
        setTitle("Prankiran");
    }, [setTitle]);

    return (
        <>
            <HomeBanner />
            {/*<UrgentCause/>*/}
            <FounderStoryComponent />
            <MissionVision/>
            <CancerJourney/>
            <QuickHelpMenu/>
            <Footer/>
        </>
    );
}