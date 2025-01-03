// Import necessary modules
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

// Route handler for fetching orders by customer ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID is required." },
      { status: 400 }
    );
  }

  try {
    // Fetch orders for the specific customer ID
    const response = await api.get("orders", {
      customer: customerId, // Use the `customer` parameter to filter by customer ID
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch orders.",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

// test url http://localhost:3000/api/getcustomerorders?customer_id=15
