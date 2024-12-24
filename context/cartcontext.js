"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCartKey } from "../hooks/useCartKey";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    cartKey,
    loading: cartKeyLoading,
    error: cartKeyError,
  } = useCartKey();

  useEffect(() => {
    if (!cartKeyLoading && cartKey) {
      fetchCartDetails();
    }
  }, [cartKey, cartKeyLoading]);

  const fetchCartDetails = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`;
      const response = await axios.get(url, { params: { cart_key: cartKey } });
      setCartData(response.data);
      setCartCount(Object.keys(response.data.items || {}).length); // Calculate item count
    } catch (err) {
      console.error("Error fetching cart details:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartCount,
        loading: loading || cartKeyLoading,
        error: error || cartKeyError,
        fetchCartDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
