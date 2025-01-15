import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, user_id, status } = body;

    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    // Create Basic Auth token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );

    const response = await axios({
      method: "post",
      url: `${baseUrl}/wp-json/wc/v3/wishlist/create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      data: {
        title,
        user_id,
        status,
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Resolve only if the status code is less than 500
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(response.data, { status: response.status });
    } else {
      throw new Error(`API responded with status ${response.status}`);
    }
  } catch (error: any) {
    console.error("Error creating wishlist:", error);

    let errorDetails;
    if (error.response) {
      errorDetails = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      };
    } else if (error.request) {
      errorDetails = {
        request: "The request was made but no response was received",
      };
    } else {
      errorDetails = {
        message: error.message,
      };
    }

    return NextResponse.json(
      {
        error: "Failed to create wishlist",
        details: errorDetails,
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
        endpoint: "/wp-json/wc/v3/wishlist/create",
        request_headers: {
          "Content-Type": "application/json",
          Authorization: "Basic **hidden**",
        },
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
