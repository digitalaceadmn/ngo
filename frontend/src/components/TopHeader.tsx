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
            sx={{ backgroundColor: "#ffffff", height: 40, justifyContent: "center" }}
        >
            <Toolbar
                sx={{
                    minHeight: "40px !important",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="body2" color="black">
                        Hi, Good Morning! Welcome to PranKiran
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <RoomIcon sx={{ fontSize: 16, color: "red" }} />
                        <Typography variant="body2" color="black">
                            Mumbai 81063
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" color="black">
                        Follow Us -
                    </Typography>
                    <IconButton size="small" >
                        <FacebookIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" >
                        <TwitterIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" >
                        <PinterestIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" >
                        <LinkedInIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopHeader;
