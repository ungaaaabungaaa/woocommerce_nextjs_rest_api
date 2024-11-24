'use client'
import { useCartKey } from '../../hooks/useCartKey';
import React, { useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const { cartKey, loading, error } = useCartKey();

  useEffect(() => {
    if (cartKey) {
      // Build the correct URL
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`;
      // Make the Axios request
      axios
        .get(url, {
          params: {
            cart_key: cartKey, // Pass the cartKey as a query parameter
          },
        })
        .then((response) => {
          console.log('Cart details:', response.data);
        })
        .catch((err) => {
          console.error('Error fetching cart details:', err);
        });
    }
  }, [cartKey]); // Runs whenever cartKey changes

 

  return (
    <div>
      <h1>Welcome to our E-commerce Store</h1>
      <p>Your cart key is: {cartKey}</p>
      <p>Check the console for cart details!</p>
    </div>
  );
}

export default Cart;
