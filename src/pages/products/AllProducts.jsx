import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all([
          axios.get("https://fakestoreapi.in/api/products?page=3"),
          axios.get("https://fakestoreapi.in/api/products?page=2"),
          axios.get("https://fakestoreapi.in/api/products?page=1"),
        ]);

        const allProducts = responses.flatMap(response => response.data.products || []);
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = products.length > 0 ? [...new Set(products.map((product) => product.category))] : [];

  const sortedProducts = products
    .filter((product) => (category ? product.category === category : true))
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <Container sx={{ minHeight: "100vh", mt: 4 }}>
      {/* Sticky Filter Section */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor:"white",
          p: 2,
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Sorting Dropdown */}
        <FormControl size="small" sx={{display:{xs:"none",md:"block"}, minWidth: 100, backgroundColor: "white", borderRadius: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
          </Select>
        </FormControl>

        {/* Category Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200, backgroundColor: "white", borderRadius: 2 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Filter by Category">
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {sortedProducts.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%" }}>
            No products available.
          </Typography>
        ) : (
          sortedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onClick={() => navigate(`/product/${product.id}`)} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AllProducts;
