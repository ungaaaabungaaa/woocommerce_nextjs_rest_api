"use client"
import { useState, useEffect, ReactNode } from 'react';
import { fetchCartKey } from '../utils/api';
import NextImage from "next/image";
import SiteLogo from "../public/sitelogo.jpeg";

// Custom Hook
export function useCartKey() {
  const [cartKey, setCartKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initializeCartKey() {
      try {
        let storedCartKey = localStorage.getItem('cart_key');

        if (!storedCartKey) {
          storedCartKey = await fetchCartKey();
          localStorage.setItem('cart_key', storedCartKey);
        }

        setCartKey(storedCartKey);
      } catch (err) {
        console.error('Error initializing cart key:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    initializeCartKey();
  }, []);

  return { cartKey, loading, error };
}

// CartKeyProvider Component
export function CartKeyProvider({ children }: { children: ReactNode }) {
  const { cartKey, loading, error } = useCartKey();

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Start the fade-out effect after loading is complete
      setFadeOut(true);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}>
        <NextImage src={SiteLogo} alt="Site Logo" width={150} height={150} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>; // You can replace with a custom error component
  }

  if (!cartKey) {
    return <div>Unable to initialize cart. Please try refreshing the page.</div>;
  }

  return <>{children}</>;
}
