import React, { useContext, useState } from "react";
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
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShopIcon from "@mui/icons-material/Shop";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { GlobalContext } from "../../AppContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const userid = localStorage.getItem("userid");

  const { cartCount } = useContext(GlobalContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userid");
    window.location.reload();
  };

  const navItems = userid
    ? [
        { text: "Products", to: "/products" },
        { text: "Update", to: "/update" },
        { text: "Logout", action: handleLogout },
      ]
    : [
        { text: "Products", to: "/products" },
        { text: "Login", to: "/login" },
        { text: "Signup", to: "/signup" },
      ];

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#1976d2", px: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo and App Name */}
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
              <ShopIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Shopping App
              </Typography>
            </Box>
          </NavLink>
          <Box sx={{display:"flex", gap:{sx:3, sm:2}, justifyContent: "center", alignItems: "center"}}>
          {/* Tablet & Desktop Navigation */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3, alignItems: "center" }}>
            {navItems.map((item, index) =>
              item.action ? (
                <Typography
                  key={index}
                  sx={{ cursor: "pointer", "&:hover": { color: "black" } }}
                  onClick={item.action}
                >
                  {item.text}
                </Typography>
              ) : (
                <NavLink
                  key={index}
                  to={item.to}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography sx={{ "&:hover": { color: "black" } }}>{item.text}</Typography>
                </NavLink>
              )
            )}
          </Box>

          {/* Cart Icon (Always Visible) */}
          <NavLink to="/cart" style={{ color: "inherit" }}>
            <Badge badgeContent={cartCount} color="warning">
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </NavLink>

          {/* Mobile Menu Icon (only on xs screens) */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", sm: "none" }, ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
            </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {navItems.map((item, index) => (
            <ListItem button key={index} onClick={item.action || handleDrawerToggle}>
              {item.action ? (
                <Typography sx={{ cursor: "pointer" }} onClick={item.action}>
                  {item.text}
                </Typography>
              ) : (
                <NavLink
                  to={item.to}
                  style={{ textDecoration: "none", color: "black",color: hover ? "red" : "black", }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={item.text} />
                </NavLink>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
