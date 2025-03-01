import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShopIcon from "@mui/icons-material/Shop";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const userid = localStorage.getItem("userid");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userid");
  };

  const navItems = userid
    ? [
      { text: "Home", to: "/" },
      { text: "Update", to: "/update" },
      { text: "Logout", action: handleLogout },
    ]
    : [
      { text: "Home", to: "/" },
      { text: "Login", to: "/login" },
      { text: "Signup", to: "/signup" },
    ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo and App Name */}
          <NavLink to="/" >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
              <ShopIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6">Shopping App</Typography>
            </Box>
          </NavLink>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item, index) =>
              item.action ? (
                <Typography
                  key={index}
                  sx={{ cursor: "pointer" }}
                  onClick={item.action}
                >
                  {item.text}
                </Typography>
              ) : (
                <NavLink key={index} to={item.to} style={{ textDecoration: "none", color: "white" }}>
                  {item.text}
                </NavLink>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {navItems.map((item, index) => (
            <ListItem button key={index} onClick={item.action || handleDrawerToggle}>
              <ListItemText>
                {item.action ? (
                  <Typography sx={{ cursor: "pointer" }} onClick={item.action}>
                    {item.text}
                  </Typography>
                ) : (
                  <NavLink to={item.to} style={{ textDecoration: "none", color: "black" }}>
                    {item.text}
                  </NavLink>
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
