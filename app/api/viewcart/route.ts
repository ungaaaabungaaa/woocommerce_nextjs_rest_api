import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    // Extract cart key from query parameters or headers
    const cartKey = request.nextUrl.searchParams.get("cart_key");

    if (!cartKey) {
      return NextResponse.json(
        { error: "Cart key is required" },
        { status: 400 }
      );
    }

    // Fetch cart details from WooCommerce
    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`;

    const response = await axios.get(url, {
      params: { cart_key: cartKey },
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
    });

    // Return the cart details
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart details:", error);

    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: "Failed to fetch cart details", details: error.message },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
