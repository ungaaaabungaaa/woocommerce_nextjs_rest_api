import { NextRequest, NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
  queryStringAuth: true,
});

export async function PUT(request: NextRequest) {
  try {
    // Extract parameters from the URL
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const transactionId = searchParams.get("transactionId");

    // Validate order ID
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Validate transaction ID
    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Prepare the update data with hardcoded payment method and dynamic transaction ID
    const updateData = {
      status: "completed",
      payment_method: "Pay Pal",
      payment_method_title: "PayPal",
      transaction_id: transactionId,
    };

    // Update order using WooCommerce API
    const response = await api.put(`orders/${orderId}`, updateData);

    // Return success response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("WooCommerce Order Update Error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          error: "Failed to update order",
          details: error.response.data,
        },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
