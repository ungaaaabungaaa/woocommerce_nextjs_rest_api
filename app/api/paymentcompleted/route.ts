import { NextRequest, NextResponse } from 'next/server';
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!,
    consumerKey: process.env.WC_CONSUMER_KEY!,
    consumerSecret: process.env.WC_CONSUMER_SECRET!,
    version: 'wc/v3',
    queryStringAuth: true, // Use Basic Authentication with query string
});

// PUT handler for Updating order using WooCommerce REST API
export async function PUT(request: NextRequest) {
    try {
        // Parse the request body
        const body = await request.json();
        
        // Extract order ID from the request 
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        // Validate order ID
        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' }, 
                { status: 400 }
            );
        }

        // Validate request body
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { error: 'Update data is required' }, 
                { status: 400 }
            );
        }

        // Update order using WooCommerce API
        const response = await api.put(`orders/${orderId}`, body);

        // Return success response
        return NextResponse.json(response.data, { status: 200 });
    } catch (error: any) {
        // Handle API errors
        console.error('WooCommerce Order Update Error:', error);

        // Check if it's an Axios error with response
        if (error.response) {
            return NextResponse.json(
                { 
                    error: 'Failed to update order', 
                    details: error.response.data 
                }, 
                { status: error.response.status || 500 }
            );
        }

        // Generic error handling
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 }
        );
    }
}

// test url http://localhost:3000/api/paymentcompleted?orderId=114
