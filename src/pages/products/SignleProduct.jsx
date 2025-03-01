import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Alert, Grid, Card, CardMedia, CardContent, Box, Button } from '@mui/material';

const SingleProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.in/api/products/${productId}`);
                setProduct(response.data.product);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <Container sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Container>;
    if (error) return <Container sx={{ textAlign: 'center', mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

    return (
        <Container sx={{ }}>
            {product && (
                <Card sx={{ maxWidth: 1200, mx: "auto", boxShadow: 3, borderRadius: 2, p: 2 }}>
                    <Grid container spacing={3} alignItems="top">
                        {/* Left Side: Image */}
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.title}
                                sx={{ width: "100%", height: "auto", objectFit: "contain" }}
                            />
                        </Grid>

                        {/* Right Side: Product Info */}
                        <Grid item xs={12} md={6}>
                            <CardContent>
                               
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2rem" } }}
                                >
                                    {product.title}
                                </Typography>
                                <Typography variant="h6" color="info.main" gutterBottom>
                                    Brand: {product.brand} | Model: {product.model}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: "success.main",
                                            fontWeight: "bold",
                                            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" }
                                        }}
                                    >
                                        ${product.price}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "error.main",
                                            borderRadius: 2,
                                            padding: 0.5,
                                            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.5rem" },
                                        }}
                                    >
                                        {product.discount}% Off
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body1"
                                    mb={2}
                                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" } }}
                                >
                                    {product.description}
                                </Typography>
                                   <Button 
                                    variant="contained" 
                                    color="warning" 
                                    sx={{ width: "auto", mb: 2 }}
                                >
                                    Order Now
                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            )}
        </Container>
    );
};

export default SingleProduct;
