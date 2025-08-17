import type { AppProps } from "next/app";
import { useEffect } from "react";
import { LayoutProvider } from "@/contexts/LayoutContext";
import BaseLayout from "@/components/BaseLayout";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Import Bootstrap styles (safe on both server & client)
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: { main: "#1976d2" },
            secondary: { main: "#9c27b0" }, 
        },
    });

    useEffect(() => {
        // Load Bootstrap JS only in browser
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
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
