// components/BaseLayout.tsx
import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { Box, CssBaseline } from "@mui/material";
import { useLayout } from "@/contexts/LayoutContext";
import Header from "@/components/Header";
import Footer from "./Footer";

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { title, theme } = useLayout();

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content={theme === "dark" ? "#0b0b0b" : "#ffffff"} />
                <meta name="robots" content="noindex, nofollow"></meta>
            </Head>
            <CssBaseline />

            {/* Full-page wrapper */}
            <Box
                component="div"
                data-theme={theme}
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    transition: "background-color 0.3s ease",
                }}
            >
                {/* Header */}
                <Header />

                {/* Main Content Area */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        py: 0,
                        transition: "all 0.3s ease",
                    }}
                >
                    <Container fluid className={`p-0`}>
                        {children}
                    </Container>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default BaseLayout;