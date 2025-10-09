import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Link, useMediaQuery, useTheme } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const TopHeader: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar
            position="static"
            sx={{ 
                backgroundColor: "#ffffff", 
                height: isMobile ? 'auto' : 40, 
                justifyContent: "center",
                minHeight: isMobile ? 'auto' : 40
            }}
        >
            <Toolbar
                sx={{
                    minHeight: isMobile ? "auto !important" : "40px !important",
                    display: "flex",
                    justifyContent: isMobile ? "center" : "space-between",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? 1 : 0,
                    py: isMobile ? 1 : 0,
                    px: isMobile ? 1 : 3
                }}
            >
                <Box 
                    display="flex" 
                    alignItems="center" 
                    gap={isSmallMobile ? 1 : 2}
                    flexDirection={isSmallMobile ? "column" : "row"}
                    textAlign={isMobile ? "center" : "left"}
                >
                    {!isSmallMobile && (
                        <Typography 
                            variant={isMobile ? "caption" : "body2"} 
                            color="black"
                            sx={{ fontSize: isMobile ? '0.7rem' : 'inherit' }}
                        >
                            Hi, Good Morning! Welcome to PranKiran
                        </Typography>
                    )}
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <RoomIcon sx={{ fontSize: isMobile ? 14 : 16, color: "red" }} />
                        <Typography 
                            variant={isMobile ? "caption" : "body2"} 
                            color="black"
                            sx={{ fontSize: isMobile ? '0.7rem' : 'inherit' }}
                        >
                            Mumbai 81063
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={isMobile ? 0.5 : 1}>
                    {!isSmallMobile && (
                        <Typography 
                            variant={isMobile ? "caption" : "body2"} 
                            color="black"
                            sx={{ fontSize: isMobile ? '0.7rem' : 'inherit' }}
                        >
                            Follow Us -
                        </Typography>
                    )}
                    <IconButton size="small" sx={{ p: isMobile ? 0.5 : 1 }}>
                        <FacebookIcon fontSize={isMobile ? "inherit" : "small"} />
                    </IconButton>
                    <IconButton size="small" sx={{ p: isMobile ? 0.5 : 1 }}>
                        <TwitterIcon fontSize={isMobile ? "inherit" : "small"} />
                    </IconButton>
                    <IconButton size="small" sx={{ p: isMobile ? 0.5 : 1 }}>
                        <PinterestIcon fontSize={isMobile ? "inherit" : "small"} />
                    </IconButton>
                    <IconButton size="small" sx={{ p: isMobile ? 0.5 : 1 }}>
                        <LinkedInIcon fontSize={isMobile ? "inherit" : "small"} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopHeader;
