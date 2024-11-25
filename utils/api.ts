export async function fetchCartKey(): Promise<string> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://13.235.113.210';
    const response = await fetch(`${apiUrl}/wp-json/cocart/v2/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.cart_key;
  } catch (error) {
    console.error('Error fetching cart key:', error);
    throw error;
  }
}