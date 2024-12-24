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

// GET handler for fetching product variations
export async function GET(request: NextRequest) {
  try {
    // Extract product ID from the query parameters
    const url = new URL(request.url);
    const productId = url.searchParams.get("id"); // Example: ?id=22

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch product variations using the WooCommerce API
    const response = await api.get(`products/${productId}/variations`);

    // Return the variations as JSON
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error fetching product variations:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.message || "An error occurred" },
      { status: error.response?.status || 500 }
    );
  }
}
