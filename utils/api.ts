export async function fetchCartKey(): Promise<string> {
    const response = await fetch('http://13.235.113.210/wp-json/cocart/v2/cart');
    if (!response.ok) {
      throw new Error('Failed to fetch cart key');
    }
    const data = await response.json();
    return data.cart_key;
  }