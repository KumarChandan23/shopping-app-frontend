import React from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink, useNavigate } from "react-router-dom";
import CategoryCard from "../products/CategoryCard";
import Footer from "../../component/footer/Footer";

const categories = [
  { title: "tv", image: "https://res.cloudinary.com/dv53eip2t/image/upload/v1740836695/television_uiemmv.jpg" },
  { title: "gaming", image: "https://res.cloudinary.com/dv53eip2t/image/upload/v1740836663/gamming_noptox.jpg" },
  { title: "appliances", image: "https://res.cloudinary.com/dv53eip2t/image/upload/v1740836663/appliences_cdym16.jpg" },
  { title: "laptop", image: "https://res.cloudinary.com/dv53eip2t/image/upload/v1740837515/laptop_rma7y0.jpg" },
  { title: "audio", image: "https://res.cloudinary.com/dv53eip2t/image/upload/v1740836663/audio_sasmnp.avif" },
  { title: "mobile", image: "https://res.cloudinary.com/dv53eip2t/image/upload/v1740837736/mobile_l8kj4v.avif" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <Box textAlign="center" sx={{ px: { xs: 3, sm: 4 }, my:{xs:2, sm:5.2}}}>
        <Typography 
          variant="h2"
          component="h1"
          color="primary"
          gutterBottom
          sx={{ typography: { xs: "h4", sm: "h3", md: "h2" } }}
        >
          Welcome to ShopEase
        </Typography>
        <Typography 
          variant="h5"
          component="p"
          sx={{ typography: { xs: "body1", sm: "h6", md: "h5" } }}
        >
          Your one-stop shop for all your needs
        </Typography>
      </Box>

      {/* Explore Button */}
      <Box textAlign="center" my={4}>
        <Button 
          variant="contained" 
          color="primary" 
          component={NavLink} 
          to="/products"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, px: { xs: 2, sm: 3 } }}
        >
          Explore Products <ArrowForwardIcon sx={{ ml: 1 }} />
        </Button>
      </Box>

      {/* Featured Categories Section */}
      <Box textAlign="center" m={4}>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3.5} key={index}>
              <CategoryCard 
                image={category.image} 
                title={category.title.charAt(0).toUpperCase() + category.title.slice(1)} 
                onClick={() => handleCategoryClick(category.title)} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
