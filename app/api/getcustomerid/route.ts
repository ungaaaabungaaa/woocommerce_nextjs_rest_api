import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; // Ensure you install Axios if not already done

// Base WooCommerce API URL
const WOO_API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;

// GET handler for fetching customer ID
export async function GET(req: NextRequest) {
  try {
    // Extract the email query parameter from the request URL
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      // Return an error response if the email parameter is missing
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    // Call WooCommerce API to get customer ID based on the email
    const response = await axios.get(
      `${WOO_API_BASE_URL}/wp-json/custom/v1/get-customer-id?email=${email}`
    );

    // Check if the response is valid
    if (response.status !== 200) {
      return NextResponse.json(
        { error: "Failed to fetch customer ID" },
        { status: response.status }
      );
    }

    // Return the response data as JSON
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching customer ID:",
      error.response?.data || error.message
    );

    // Return an error response
    return NextResponse.json(
      {
        error:
          error.response?.data ||
          "An error occurred while fetching customer ID",
      },
      { status: error.response?.status || 500 }
    );
  }
}

// test url http://localhost:3000/api/getcustomerid?email=test2@test.com
