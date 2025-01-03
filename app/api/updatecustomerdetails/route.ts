import { NextRequest, NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["email", "first_name", "last_name", "username"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Prepare customer data
    const customerData = {
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      username: body.username,
      billing: {
        first_name: body.first_name,
        last_name: body.last_name,
        company: body.billing?.company || "",
        address_1: body.billing?.address_1 || "",
        address_2: body.billing?.address_2 || "",
        city: body.billing?.city || "",
        state: body.billing?.state || "",
        postcode: body.billing?.postcode || "",
        country: body.billing?.country || "",
        email: body.email,
        phone: body.billing?.phone || "",
      },
      shipping: {
        first_name: body.first_name,
        last_name: body.last_name,
        company: body.shipping?.company || "",
        address_1: body.shipping?.address_1 || "",
        address_2: body.shipping?.address_2 || "",
        city: body.shipping?.city || "",
        state: body.shipping?.state || "",
        postcode: body.shipping?.postcode || "",
        country: body.shipping?.country || "",
      },
    };

    // Make API request to WooCommerce
    const response = await api.put(`customers/${params.id}`, customerData);

    return NextResponse.json(
      {
        success: true,
        customer: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating customer:", error);

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// test code

// const updateCustomer = async (id, customerData) => {
//   const response = await fetch(`/api/customers/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(customerData)
//   });
//   return response.json();
// };
