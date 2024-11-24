import { useState, useEffect } from 'react';
import { fetchCartKey } from '../utils/api';

export function useCartKey() {
  const [cartKey, setCartKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initializeCartKey() {
      try {
        // Check if cart_key exists in localStorage
        let storedCartKey = localStorage.getItem('cart_key');

        if (!storedCartKey) {
          // If not, fetch a new cart_key
          storedCartKey = await fetchCartKey();
          // Store the new cart_key in localStorage
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