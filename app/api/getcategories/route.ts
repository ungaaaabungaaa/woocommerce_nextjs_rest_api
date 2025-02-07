import { NextRequest, NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true, // Force Basic Authentication as query string true and using under HTTPS
});

// GET handler for fetching all Categories
export async function GET(req: NextRequest) {
  try {
    // Call WooCommerce API to get product categories with per_page=50
    const response = await api.get("products/categories", {
      per_page: 50, // Set default to 50
    });

    // Return the response data as JSON
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching categories:",
      error.response?.data || error.message
    );

    // Return an error response
    return NextResponse.json(
      {
        error:
          error.response?.data || "An error occurred while fetching categories",
      },
      { status: error.response?.status || 500 }
    );
  }
}
