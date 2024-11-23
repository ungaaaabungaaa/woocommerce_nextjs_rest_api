import { NextRequest, NextResponse } from 'next/server';
import CoCart from '@cocart/cocart-rest-api';

const cocart = new CoCart({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'https://default-url.com', // Fallback
  consumerKey: process.env.WC_CONSUMER_KEY || 'default_key', // Fallback key
  consumerSecret: process.env.WC_CONSUMER_SECRET || 'default_secret', // Fallback secret
});


export async function GET(req: NextRequest) {
  try {
    // Fetch the cart using CoCart API
    const response = await cocart.get('cart');

    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching cart:', error.response?.data || error.message);

    return NextResponse.json(
      {
        message: error.response?.data?.message || 'Failed to fetch cart items',
      },
      { status: error.response?.status || 500 }
    );
  }
}
