import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import Banner from "@/assets/images/banner.png"

const HomeBanner = () => {
    return (
        <Box
            sx={{
                position: "relative",
                height: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                backgroundImage: `url('${Banner.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                },
            }}
        >
            <Box sx={{ position: "relative", zIndex: 2, maxWidth: '80%', px: 2 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                >
                    Prankiran – Guiding Cancer Patients Towards the Right Care
                </Typography>

                <Box
                    sx={{
                        width: 180,
                        height: 6,
                        backgroundColor: "orange",
                        borderRadius: 2,
                        mx: "auto",
                        mb: 3,
                    }}
                />

                <Typography variant="body1" sx={{ mb: 4 }}>
                    We stand beside patients, helping them find trusted doctors and access the treatment they deserve.
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "red",
                            px: 4,
                            "&:hover": { backgroundColor: "#c62828" },
                        }}
                    >
                        Meet Doctors
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "orange",
                            px: 4,
                            "&:hover": { backgroundColor: "#ef6c00" },
                        }}
                    >
                        CONTACT US
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default HomeBanner;