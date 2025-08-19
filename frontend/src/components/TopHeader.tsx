import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Link } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const TopHeader: React.FC = () => {
    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: "#B8860B", height: 40, justifyContent: "center" }}
        >
            <Toolbar
                sx={{
                    minHeight: "40px !important",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="body2" color="white">
                        Hi, Good Morning! Welcome to PranKiran
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <RoomIcon sx={{ fontSize: 16, color: "red" }} />
                        <Typography variant="body2" color="white">
                            Mumbai 81063
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" color="white">
                        Follow Us -
                    </Typography>
                    <IconButton size="small" color="inherit">
                        <FacebookIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="inherit">
                        <TwitterIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="inherit">
                        <PinterestIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="inherit">
                        <LinkedInIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopHeader;
