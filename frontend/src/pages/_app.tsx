"use client";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { LayoutProvider } from "@/contexts/LayoutContext";
import BaseLayout from "@/components/BaseLayout";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const HARD_CODED_PASSWORD = "Pr@k1R!";

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
  });

  useEffect(() => {
    const adminFlag = sessionStorage.getItem("isAdmin");
    if (adminFlag === "true") {
      setIsAdmin(true);
    }

    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      document.body.appendChild(script);
    }
  }, []);

  const handleLogin = () => {
    if (password === HARD_CODED_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem("isAdmin", "true"); 
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutProvider>
        {!isAdmin ? (
          <Container
            maxWidth="md"
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              py: 8,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                🚧 Site Under Construction 🚧
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                We’re working hard to bring something amazing. Stay tuned!
              </Typography>
            </motion.div>

            {!showLogin ? (
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 4 }}
                onClick={() => setShowLogin(true)}
              >
                Admin Login
              </Button>
            ) : (
              <Paper
                elevation={4}
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  maxWidth: 400,
                  mx: "auto",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Admin Access
                </Typography>
                <TextField
                  type="password"
                  label="Enter Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Paper>
            )}
          </Container>
        ) : (
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        )}
      </LayoutProvider>
    </ThemeProvider>
  );
}
