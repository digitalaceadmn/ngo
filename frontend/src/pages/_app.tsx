import type { AppProps } from "next/app";
import { LayoutProvider } from "@/contexts/LayoutContext";
import BaseLayout from "@/components/BaseLayout";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Import Bootstrap styles (safe on both server & client)
// Temporarily comment out to test if this is causing the issue
import "bootstrap/dist/css/bootstrap.min.css";

import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: { main: "#1976d2" },
            secondary: { main: "#9c27b0" }, 
        },
    });



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
