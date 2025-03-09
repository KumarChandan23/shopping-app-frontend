import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export const GlobalContext = createContext();

export const AppContext = ({ children }) => {
  const [userData, setUserData] = useState({ cart: [] });
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const loadCartProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/users/${userId}`);
        setUserData(data || { cart: [] });
        setCartCount(data?.cart?.length || 0);
      } catch (error) {
        toast.error("Error occurred while fetching products");
      }
    };
    loadCartProduct();
  }, [userId]);

  const addToCart = async (product) => {
    try {
      // ✅ Save the previous cart state
      const prevCart = [...userData.cart];

      // ✅ Optimistically update the UI
      const updatedCart = prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      if (!updatedCart.find(item => item.id === product.id)) {
        updatedCart.push({ ...product, quantity: 1 });
      }

      setUserData(prevState => ({ ...prevState, cart: updatedCart }));
      setCartCount(updatedCart.length);

      // ✅ Update backend
      await axios.patch(`http://localhost:8000/users/${userId}`, { cart: updatedCart });

      toast.success("Product Added to your cart");
    } catch (error) {
      // ❌ If API call fails, revert UI to previous cart state
      setUserData(prevState => ({ ...prevState, cart: prevCart }));
      setCartCount(prevCart.length);

      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <GlobalContext.Provider value={{ userData,setUserData, cartCount, setCartCount, addToCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
