import React, { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import { Button, Typography, Container } from "@mui/material";
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
