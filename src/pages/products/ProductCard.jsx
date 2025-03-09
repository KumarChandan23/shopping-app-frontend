import React, { useContext } from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { GlobalContext } from "../../AppContext";

const ProductCard = ({ product, onClick }) => {

    const {addToCart} = useContext(GlobalContext);

    return (
        <Card sx={{ maxWidth: 350, mx: "auto", boxShadow: 3, borderRadius: 2, padding: 1 }}>
            <CardActionArea onClick={onClick}>
                <CardMedia component="img" height="250" image={product.image} alt={product.title} />
                <CardContent>
                    <Typography>{product.title.slice(0, 40) + "..."}</Typography>
                    <Typography sx={{color: "green"}}>Price: ${product.price}</Typography>
                </CardContent>
            </CardActionArea>
            <Button onClick={()=> addToCart(product)} sx={{ backgroundColor: "warning.main", color: "white", width: "100%" }}>Add To Cart</Button>
        </Card>
    );
};

export default ProductCard;
