import { NextRequest, NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// test url http://localhost:3000/api/getproductsearch?search=Beanie

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, // Your WooCommerce site URL
  consumerKey: process.env.WC_CONSUMER_KEY, // Consumer Key
  consumerSecret: process.env.WC_CONSUMER_SECRET, // Consumer Secret
  version: "wc/v3", // WooCommerce REST API version
  queryStringAuth: true, // Forcing Basic Authentication
});

// GET handler for product search
export async function GET(request: NextRequest) {
  try {
    // Extract the 'search' parameter from the query string
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search");

    // Validate the 'search' parameter
    if (!searchQuery) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Fetch products from WooCommerce using the search query
    const response = await api.get("products", {
      search: searchQuery.replace(/"/g, ""), // Remove unwanted quotes from input
    });

    // Return the fetched product data
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
