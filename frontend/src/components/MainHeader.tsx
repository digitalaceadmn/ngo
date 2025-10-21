"use client";
import React, { useState } from "react";
import Logo from "@/assets/images/symbol2.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton, Drawer, List, ListItem, useMediaQuery, useTheme, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HiMenuAlt3 } from "react-icons/hi";

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
        className="sticky-top shadow-sm header-bg">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <img
              src={Logo.src ?? Logo}
              alt="PranKiran Logo"
              style={{ objectFit: "contain", width: 80, height: 'auto' }}
            />
            <div className="ms-2">
              <h4 className="mb-0 fw-semibold text-success">PranKiran</h4>
              <span className="text-white small ms-1">Ray of Vitality</span>
            </div>

          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="d-flex gap-4 ms-auto me-5">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`text-decoration-none ${isActive ? "text-yellow fw-bold" : "text-white"
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
              <HiMenuAlt3 size={35} />
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
            backgroundColor: '#00251F',
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
