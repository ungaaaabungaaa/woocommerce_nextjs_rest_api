import { NextRequest, NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
  queryStringAuth: true,
});

export async function PUT(req: NextRequest) {
  console.log("Received PUT request to update customer");
  try {
    const body = await req.json();
    console.log("Request body:", body);
    const { id, ...customerData } = body;

    if (!id) {
      console.log("Error: Customer ID is missing");
      return NextResponse.json(
        { success: false, error: "Customer ID is required" },
        { status: 400 }
      );
    }

    console.log(`Updating customer with ID: ${id}`);
    console.log("Customer data to update:", customerData);

    const response = await api.put(`customers/${id}`, customerData);
    console.log("WooCommerce API response:", response.data);

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update customer",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
