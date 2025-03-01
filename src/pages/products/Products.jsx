import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Grid, Card, CardActionArea, CardMedia, CardContent,
  Typography, Container, Box, Button, List, ListItem,
  ListItemButton, ListItemText, Drawer, IconButton
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; 
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { category } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `https://fakestoreapi.in/api/products/category?type=${category}`
            : "https://fakestoreapi.in/api/products?page=3"
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const loadCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.in/api/products/category");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadProducts();
    loadCategories();
  }, [category]);

  const handleCategoryClick = (cat) => {
    navigate(`/products/${cat}`);
    setDrawerOpen(false);
  };

  return (
    <Container sx={{ minHeight: "100vh", display: "flex", position: "relative" }}>
      {isMobile && !drawerOpen  && (
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "fixed",
            top: 70,
            left: 10,
            backgroundColor: "royalblue",
            color: "white",
            zIndex: 2000,
            borderRadius:1
          }}
        >
          <MenuIcon style={{marginRight:"5px"}} />{category.charAt(0).toUpperCase() + category.slice(1)}
        </IconButton>
      )}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: isMobile ? "block" : "none" }}
      >
        <Box sx={{ width: 250, top: "70px", zIndex: 2001, backgroundColor: "white", p: 2 }}>
          <Typography variant="h6">Categories</Typography>
          <List>
            {categories.map((cat) => (
              <ListItem key={cat} disablePadding>
                <ListItemButton onClick={() => handleCategoryClick(cat)}>
                  <ListItemText primary={cat.charAt(0).toUpperCase() + cat.slice(1)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {!isMobile && (
        <Box
          sx={{
            width: "200px",
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "royalblue",
            color: "white",
            p: 2,
            position: "fixed",
            left: 0,
            top: 0,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <List>
            {categories.map((cat) => (
              <ListItem key={cat} disablePadding>
                <ListItemButton onClick={() => handleCategoryClick(cat)}>
                  <ListItemText primary={cat.charAt(0).toUpperCase() + cat.slice(1)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box sx={{ ml: isMobile ? 0 : "200px", width: "100%", p: 2 }}>
        <Grid container spacing={2}>
          {products.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
              No products found in this category.
            </Typography>
          ) : (
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 400, mx: "auto", boxShadow: 3, borderRadius: 2 }}>
                  <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={product.image}
                      alt={product.title}
                      sx={{ objectFit: "contain", transition: "transform 0.3s ease-in-out", "&:hover": { transform: "scale(1.03)" } }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" noWrap>
                        {product.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Typography variant="h5" sx={{ color: "success.main" }}>
                          ${product.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <Box m={2} mt={0}>
                    <Button
                      variant="outlined"
                      color="warning"
                      fullWidth
                      sx={{ "&:hover": { backgroundColor: "warning.main", color: "white" }, transition: "0.3s ease-in-out" }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Products;
