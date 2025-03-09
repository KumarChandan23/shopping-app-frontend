import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  useMediaQuery,
} from "@mui/material";
import { GlobalContext } from "../../AppContext";

const Cart = () => {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Mobile view breakpoint
  const { userData, setUserData, setCartCount, addToCart } = useContext(GlobalContext);

  const cartItems = userData?.cart || [];

  const removeCartItem = async (product) => {
    try {
      const prevCart = [...userData.cart];

      // ✅ Decrease quantity or remove item if quantity is 1
      const updatedCart = prevCart
        .map((item) => (item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0); // Remove items with quantity 0

      // ✅ Update state optimistically
      setUserData((prevState) => ({ ...prevState, cart: updatedCart }));
      setCartCount(updatedCart.length);

      // ✅ Ensure userId is defined
      if (!userData?.id) {
        throw new Error("User ID is missing");
      }

      // ✅ Update backend
      await axios.patch(`http://localhost:8000/users/${userData.id}`, { cart: updatedCart });

      toast.success("Product removed from your cart");
    } catch (error) {
      // ❌ Revert to previous state if API call fails
      setUserData((prevState) => ({ ...prevState, cart: prevCart }));
      setCartCount(prevCart.length);

      toast.error("Failed to remove product. Please try again.");
    }
  };

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center">
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          Your cart is empty
        </Typography>
      ) : isMobile ? (
        // ✅ MOBILE VIEW (Card Layout)
        <Box display="flex" flexDirection="column" gap={2}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: "flex", flexDirection: "column", boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: "contain", padding: 2 }}
              />
              <CardContent>
                <Typography>{item.title}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", marginY: 1, gap:1, alignItems: "center"}}>
                  <Typography variant="body1" color="warning">
                    Quantity: {item.quantity}
                  </Typography>
                  <Button variant="contained" color="inherit" onClick={() => addToCart(item)}>
                    +1
                  </Button>
                </Box>
                <Typography variant="h6" color="success">
                  Price: ${item.price * item.quantity}
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="secondary" size="small" onClick={() => removeCartItem(item)}>
                    Remove
                  </Button>
                  <Button variant="contained" color="primary" size="small">
                    Order
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Box textAlign="center" mt={3}>
            <Typography variant="h6">
              <strong>Total:</strong> ${totalPrice}
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
              Order All
            </Button>
          </Box>
        </Box>
      ) : (
        // ✅ DESKTOP & TABLET VIEW (Table Layout)
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "primary.main" }}>
                <TableRow>
                  {["Image", "Title", "Quantity", "Price", "Remove", "Order"].map((header) => (
                    <TableCell key={header} sx={{ color: "white", textAlign: "center" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id} sx={{ "& td": { textAlign: "center" } }}>
                    <TableCell>
                      <img src={item.image} alt={item.name} width="120" />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          p: 1,
                          borderRadius: 1,
                          justifyContent: "center",
                        }}
                      >
                        {item.quantity}
                        <Button variant="contained" color="warning" size="small" onClick={() => addToCart(item)} sx={{ ml: 1 }}>
                          + 1
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>${item.price * item.quantity}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" size="small" onClick={() => removeCartItem(item)}>
                        Remove
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ✅ Total Price & Order All Button */}
          <Box textAlign="center" mt={3}>
            <Typography variant="h6">
              <strong>Total:</strong> ${totalPrice}
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
              Order All
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
