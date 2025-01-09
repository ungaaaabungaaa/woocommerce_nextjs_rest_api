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

// POST handler for creating an order using WooCommerce REST API
export async function POST(request: NextRequest) {
  try {
    // Extract the order data from the request body
    const body = await request.json();

    // Define the data for the order (you can replace this with dynamic values)
    const data = {
      payment_method: body.payment.method,

      payment_method_title: body.payment.title,
      transaction_id: body.payment.transactionID,
      set_paid: true,
      billing: {
        first_name: body.billing.first_name,
        last_name: body.billing.last_name,
        address_1: body.billing.address_1,
        address_2: body.billing.address_2 || "",
        city: body.billing.city,
        state: body.billing.state,
        postcode: body.billing.postcode,
        country: body.billing.country,
        email: body.billing.email,
        phone: body.billing.phone,
      },
      shipping: {
        first_name: body.shipping.first_name,
        last_name: body.shipping.last_name,
        address_1: body.shipping.address_1,
        address_2: body.shipping.address_2 || "",
        city: body.shipping.city,
        state: body.shipping.state,
        postcode: body.shipping.postcode,
        country: body.shipping.country,
        phone: body.billing.phone,
      },
      line_items: body.line_items,
      shipping_lines: body.shipping_lines,
    };

    // Make the POST request to create the order
    const response = await api.post("orders", data);
    // Respond with the created order data
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    // Log and return the error
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 400 }
    );
  }
}

// test body
// {
//     "payment": {
//       "method": "bacs",
//       "title": "Direct Bank Transfer",
//       "transactionID": "123456789"
//     },
//     "billing": {
//       "first_name": "John",
//       "last_name": "Doe",
//       "address_1": "123 Main St",
//       "address_2": "Suite 1",
//       "city": "Springfield",
//       "state": "IL",
//       "postcode": "62701",
//       "country": "US",
//       "email": "john.doe@example.com",
//       "phone": "555-123-4567"
//     },
//     "shipping": {
//       "first_name": "John",
//       "last_name": "Doe",
//       "address_1": "123 Main St",
//       "address_2": "Suite 1",
//       "city": "Springfield",
//       "state": "IL",
//       "postcode": "62701",
//       "country": "US",
//       "phone": "555-123-4567"
//     },
//     "line_items": [
//       {
//         "product_id": 123,
//         "quantity": 2
//       },
//       {
//         "product_id": 456,
//         "quantity": 1
//       }
//     ],
//     "shipping_lines": [
//       {
//         "method_id": "flat_rate",
//         "method_title": "Flat Rate",
//         "total": "10.00"
//       }
//     ]
//   }
