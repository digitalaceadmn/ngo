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
import dynamic from "next/dynamic";
import MissionAndVision from "@/components/MissionAndVisaion";
import JoinTheMovement from "@/components/JoinTheMovement";
import Learning from "../components/Learning";

const PatientStoriesTabs = dynamic(() => import("@/components/PatientStoriesTabs"), { ssr: false });


export default function HomePage() {
    const { setTitle } = useLayout();

    useEffect(() => {
        setTitle("Prankiran");
    }, [setTitle]);

    return (
        <>
            <HomeBanner />
            {/*<UrgentCause/>*/}
            <MissionAndVision></MissionAndVision>
            <FounderStoryComponent />
            <PatientStoriesTabs />
            <MissionVision />
            <CancerJourney />
            <QuickHelpMenu />
            <Learning/>
            <JoinTheMovement />
            <Footer />
        </>
    );
}