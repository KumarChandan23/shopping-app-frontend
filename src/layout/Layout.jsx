import React from "react";
import Navbar from "../component/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Fixed Navbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <Navbar />
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ mt: 8, flex: 1, overflowY: "auto", height: "calc(100vh - 64px)" }}>
        <Outlet />
      </Box>
    
    </Box>
  );
};

export default Layout;
