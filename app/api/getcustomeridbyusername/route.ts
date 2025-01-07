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

export async function GET(req: NextRequest) {
  try {
    // Extract the username from search params
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Call the WooCommerce API to get customer details
    const response = await api.get(`customers`, {
      username: username,
    });

    // Check if customer was found
    if (response.data.length === 0) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Return the customer data
    return NextResponse.json(response.data[0]);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// test url http://localhost:3000/api/getcustomeridbyusername?username=test
