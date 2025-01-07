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

// GET handler for fetching customer details
export async function GET(req: NextRequest) {
  try {
    // Extract the `id` parameter from the URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Validate the `id`
    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Fetch customer details from WooCommerce
    const response = await api.get(`customers/${id}`);

    // Return the customer details
    return NextResponse.json(response.data);
  } catch (error: any) {
    // Handle errors
    return NextResponse.json(
      { error: error.response?.data?.message || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

// test url
// /api/customers?id=123
