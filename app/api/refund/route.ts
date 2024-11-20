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

// POST handler for Refund
export async function POST(request: NextRequest) {
    try {
        // Extract order ID from the query parameters
        const url = new URL(request.url);
        const orderId = url.searchParams.get('orderId'); // Example: ?orderId=723

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required in the query string.' },
                { status: 400 }
            );
        }

        // Fetch the order details first to get the total amount and line items
        const orderResponse = await api.get(`orders/${orderId}`);
        const order = orderResponse.data;

        // Check if line_items exists
        if (!order.line_items) {
            return NextResponse.json(
                { error: 'No line items found for this order.' },
                { status: 404 }
            );
        }

        // Prepare the refund data
        const refundData = {
            amount: order.total, // Refund the full amount of the order
            line_items: order.line_items.map((item: any) => ({
                id: item.id,
                refund_total: item.total,
                refund_tax: item.tax_lines ? item.tax_lines.map((tax: any) => ({
                    id: tax.id,
                    refund_total: tax.total,
                })) : [],
            })),
        };

        // Make the API call to WooCommerce to create a refund
        const refundResponse = await api.post(`orders/${orderId}/refunds`, refundData);

        // Return the refund response
        return NextResponse.json(refundResponse.data, { status: 200 });
    } catch (error: any) {
        console.error('Refund Error:', error.response?.data || error.message);

        // Return error response
        return NextResponse.json(
            { error: error.response?.data || error.message },
            { status: error.response?.status || 500 }
        );
    }
}
