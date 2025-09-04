import type { AppProps } from "next/app";
import { LayoutProvider } from "@/contexts/LayoutContext";
import BaseLayout from "@/components/BaseLayout";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Import Bootstrap styles (safe on both server & client)
// Temporarily comment out to test if this is causing the issue
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: { main: "#1976d2" },
            secondary: { main: "#9c27b0" },
        },
    });

    useEffect(() => {
        // Load FB SDK
        if (!document.getElementById("facebook-jssdk")) {
            const script = document.createElement("script");
            script.id = "facebook-jssdk";
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
            document.body.appendChild(script);
        }
    }, []);



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LayoutProvider>
                <BaseLayout>
                    <Component {...pageProps} />
                </BaseLayout>
            </LayoutProvider>
        </ThemeProvider>
    );
}
