"use client";
import React, { useState } from "react";
import Logo from "@/assets/images/logo-t.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Model", path: "/model" },
  { name: "Contact Us", path: "/contact-us" },
];

const MainHeader: React.FC = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="sticky-top border-bottom border-golden shadow-sm"
        style={{
          backgroundColor: "#0a1f44",
          boxShadow:
            "rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px !important",
        }}
      >
        <div className={`container d-flex align-items-center justify-content-between ${isMobile ? 'py-2' : 'py-3'}`}>
          {/* Logo */}
          <div className="d-flex align-items-center">
            <img
              src={Logo.src ?? Logo}
              alt="PranKiran Logo"
              width={isMobile ? 160 : 220}
              height={isMobile ? 60 : 80}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="d-flex gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`text-decoration-none ${
                      isActive ? "text-dark-golden fw-bold" : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Desktop CTA Button */}
          {!isMobile && (
            <div className="d-flex align-items-center gap-3">
              <button className="btn-primary shadow-sm">Meet Doctors</button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: '#0a1f44',
            color: 'white'
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <ListItem key={link.name} disablePadding>
                <Link
                  href={link.path}
                  onClick={handleLinkClick}
                  style={{
                    width: '100%',
                    textDecoration: 'none',
                    color: isActive ? '#f9a826' : 'white',
                    fontWeight: isActive ? 'bold' : 'normal',
                    padding: '12px 16px',
                    display: 'block'
                  }}
                >
                  {link.name}
                </Link>
              </ListItem>
            );
          })}
          <ListItem sx={{ px: 2, pt: 2 }}>
            <button 
              className="btn-primary shadow-sm w-100"
              onClick={handleLinkClick}
            >
              Meet Doctors
            </button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MainHeader;
