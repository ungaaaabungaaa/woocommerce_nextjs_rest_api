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

// Define the response data structure
interface ResponseData {
  success: boolean;
  products: any[]; // You can specify a more detailed type here based on the product structure
  error?: string;
}

// GET handler for fetching products
export async function GET(req: NextRequest) {
  const responseData: ResponseData = {
    success: false,
    products: [],
  };

  const url = new URL(req.url);
  const perPage = url.searchParams.get("perPage") || 50; // Use query parameter for perPage or default to 50

  try {
    // Fetch products from WooCommerce API
    const { data } = await api.get("products", {
      per_page: parseInt(perPage as string), // Parse to ensure it's a number
    });

    // Prepare the response
    responseData.success = true;
    responseData.products = data;

    // Send response
    return NextResponse.json(responseData);
  } catch (error: any) {
    // Catch and handle errors
    responseData.error = error.message || "Failed to fetch products";
    return NextResponse.json(responseData, { status: 500 });
  }
}
