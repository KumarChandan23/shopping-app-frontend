import React, { useContext } from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

const CategoryCard = ({ image, title, onClick }) => {


  return (
    <Card sx={{ maxWidth: 350, mx: "auto", boxShadow: 3, borderRadius: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent>
          <Typography variant="h6" component="div" align="center">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
