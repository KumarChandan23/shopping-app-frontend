import React from "react";
import { Container, Grid, Typography, Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" py={4} bgcolor="primary.main" color="white">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ShopEase
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all your needs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" variant="body2" display="block">
              Home
            </Link>
            <Link href="/products" color="inherit" variant="body2" display="block">
              Products
            </Link>
            <Link href="/about" color="inherit" variant="body2" display="block">
              About Us
            </Link>
            <Link href="/contact" color="inherit" variant="body2" display="block">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: support@shopease.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 234 567 890
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;