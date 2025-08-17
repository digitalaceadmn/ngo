import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap"; // Bootstrap container
import { Box } from "@mui/material"; // MUI layout component
import { useLayout } from "@/contexts/LayoutContext";
import Header from "@/components/Header";

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { title, theme } = useLayout();

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Full-page wrapper */}
            <Box
                component="div"
                data-theme={theme}
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: theme === "dark" ? "#0b0b0b" : "#fff",
                }}
            >
                {/* Header stays fixed */}
                <Header />

                {/* Main Content Area */}
                <Box component="main" sx={{ flex: 1, py: 3 }}>
                    <Container fluid>
                        {children}
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default BaseLayout;
