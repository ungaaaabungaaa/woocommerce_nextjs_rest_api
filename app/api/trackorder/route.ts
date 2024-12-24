import { NextRequest, NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true, // Use Basic Authentication with query string
});

// GET handler for track order
export async function GET(request: NextRequest) {
  try {
    // Extract the 'id' parameter from the query string
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");

    // Validate the 'id' parameter
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Fetch order details from WooCommerce
    const response = await api.get(`orders/${orderId}`);

    // Return the fetched order data
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    // Handle API errors
    return NextResponse.json(
      {
        error:
          error.response?.data ||
          error.message ||
          "An unexpected error occurred",
      },
      { status: error.response?.status || 500 }
    );
  }
}
