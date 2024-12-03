import { NextRequest, NextResponse } from 'next/server';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || '',
  consumerKey: process.env.WC_CONSUMER_KEY || '',
  consumerSecret: process.env.WC_CONSUMER_SECRET || '',
  version: 'wc/v3',
  queryStringAuth: true
});

export async function GET(
  request: NextRequest, 
  { params }: { params: { productId: string } }
) {
  try {
    // Extract product ID from the route parameters
    const productId = params.productId;

    // Validate product ID
    if (!productId) {
      return NextResponse.json({
        success: false,
        error: 'Product ID is required'
      }, { status: 400 });
    }

    // Fetch the entire product object from WooCommerce
    const response = await api.get(`products/${productId}`);

    // Return the entire product data
    return NextResponse.json(response.data, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching WooCommerce product:', error);

    // Handle specific WooCommerce API errors
    if (error.response) {
      return NextResponse.json({
        success: false,
        error: error.response.data.message || 'Failed to fetch product'
      }, { status: error.response.status || 500 });
    }

    // Generic error handling
    return NextResponse.json({
      success: false,
      error: 'An unexpected error occurred'
    }, { status: 500 });
  }
}