'use client'
import { useCartKey } from '../../hooks/useCartKey';
import React from 'react'
function Cart() {
  const { cartKey, loading, error } = useCartKey();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div>
      <h1>Welcome to our E-commerce Store</h1>
      <p>Your cart key is: {cartKey}</p>
    </div>
  )
}

export default Cart