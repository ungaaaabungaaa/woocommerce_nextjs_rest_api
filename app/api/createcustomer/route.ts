import { NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

export async function POST(req: any) {
  try {
    // Parse the body of the request
    const body = await req.json();

    // Construct the customer data
    const data = {
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      username: body.username,
      billing: {
        first_name: body.first_name,
        last_name: body.last_name,
        company: body.billing.company || "",
        address_1: body.billing.address_1,
        address_2: body.billing.address_2 || "",
        city: body.billing.city,
        state: body.billing.state,
        postcode: body.billing.postcode,
        country: body.billing.country,
        email: body.email,
        phone: body.billing.phone,
      },
      shipping: {
        first_name: body.first_name,
        last_name: body.last_name,
        company: body.shipping.company || "",
        address_1: body.shipping.address_1,
        address_2: body.shipping.address_2 || "",
        city: body.shipping.city,
        state: body.shipping.state,
        postcode: body.shipping.postcode,
        country: body.shipping.country,
      },
    };

    // Create a customer using the WooCommerce API
    const response = await api.post("customers", data);

    // Respond with the created customer's data
    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json(
      { success: false, error: error.response?.data || error.message },
      { status: 400 }
    );
  }
}
