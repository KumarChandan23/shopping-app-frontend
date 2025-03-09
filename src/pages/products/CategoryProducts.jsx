import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard"; // Assuming a reusable product card

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.in/api/products/category?type=${category}`
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <Container sx={{ minHeight: "100vh", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {category.charAt(0).toUpperCase() + category.slice(1)} Products
      </Typography>
      <Grid container spacing={2}>
        {products.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%" }}>
            No products found in this category.
          </Typography>
        ) : (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CategoryProducts;
