import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Logo from "@/assets/images/logo.png"; // Assuming you have a logo image

const navLinks = ["Home", "Causes", "Events", "Portfolio", "Pages", "Blog"];

const MainHeader: React.FC = () => {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: "black", color: "white", borderBottom: "1px solid #333" }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo Section */}
                <Box display="flex" alignItems="center" gap={1}>

                    <Box>
                            <img src={Logo.src ?? Logo} alt="Logo" width={280} height={100} />
                    </Box>
                </Box>

                {/* Nav Links */}
                <Box display="flex" gap={3}>
                    {navLinks.map((link) => (
                        <Link
                            key={link}
                            href="#"
                            underline="none"
                            sx={{
                                color: link === "Home" ? "red" : "white",
                                fontWeight: link === "Home" ? "bold" : "normal",
                                "&:hover": { color: "red" },
                            }}
                        >
                            {link}
                        </Link>
                    ))}
                </Box>

                {/* Right Side Icons + Button */}
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton sx={{ color: "white" }}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton sx={{ color: "white" }}>
                        <PersonOutlineIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "red",
                            "&:hover": { backgroundColor: "#cc0000" },
                        }}
                    >
                        Meet Doctors
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MainHeader;
