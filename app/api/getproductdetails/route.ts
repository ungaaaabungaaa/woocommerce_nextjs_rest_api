import { NextRequest, NextResponse } from 'next/server';
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
    queryStringAuth: true, // Use Basic Authentication with query string
});

// GET handler for fetching product details
export async function GET(request: NextRequest) {
    try {
        // Extract product ID from the query parameters
        const url = new URL(request.url);
        const productId = url.searchParams.get('id'); // Example: ?id=794

        if (!productId) {
            return NextResponse.json(
                { error: 'Product ID is required in the query string.' },
                { status: 400 }
            );
        }

        // Fetch product details from WooCommerce
        const response = await api.get(`products/${productId}`);

        // Return product data
        return NextResponse.json(response.data, { status: 200 });
    } catch (error: any) {
        console.error('WooCommerce API Error:', error.response?.data || error.message);

        // Return error response
        return NextResponse.json(
            { error: error.response?.data || error.message },
            { status: error.response?.status || 500 }
        );
    }
}

// test url 
// http://localhost:3000//api/getproductdetails?id=104
