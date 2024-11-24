
import { NextRequest, NextResponse } from 'next/server';
const CoCartAPI = require("@cocart/cocart-rest-api").default;

interface CartRequestBody {
  productId: string | number;
  quantity?: number;
  variation?: Array<any>;
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse and validate the incoming request body
    const body = await request.json() as CartRequestBody;
    console.log('Received request body:', body); // Debug: log the incoming request body

    const { productId, quantity = 1, variation = [] } = body;

    // Enhanced validation for productId
    if (!productId || (typeof productId !== 'string' && typeof productId !== 'number')) {
      console.error('Invalid productId:', productId); // Debug: log invalid productId
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid product ID. Must be a string or number.' 
        },
        { status: 400 }
      );
    }

    // Validate environment variables
    const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!siteUrl || !consumerKey || !consumerSecret) {
      console.error('Missing required environment variables:', {
        hasSiteUrl: !!siteUrl,
        hasConsumerKey: !!consumerKey,
        hasConsumerSecret: !!consumerSecret,
      });
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error: Missing required credentials' 
        },
        { status: 500 }
      );
    }

    // Initialize CoCart API with validated credentials
    const cocart = new CoCartAPI({
      url: siteUrl,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
    });

    // Prepare the request payload
    const payload = {
      id: String(productId), // Ensure ID is a string
      quantity: String(Math.max(1, Math.floor(Number(quantity)))), // Ensure quantity is a string
      variation: Array.isArray(variation) ? variation : [] // Ensure variation is an array
    };

    console.log('Prepared payload for CoCart API:', payload); // Debug: log the prepared payload

    // Make the API call to CoCart
    const response = await cocart.post('cart/add-item', payload);

    // Log the response from CoCart API
    console.log('CoCart API Response:', response.data);

    // Validate response
    if (!response?.data) {
      throw new Error('Invalid response from CoCart API');
    }

    return NextResponse.json({
      success: true,
      message: 'Product added to cart successfully!',
      data: response.data,
    });

  } catch (error: any) {
    console.error('Error adding product to cart:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    // Enhanced error handling with specific error types
    const statusCode = error.response?.status || 500;
    let errorMessage = 'Failed to add product to cart.';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Unable to connect to the cart service.';
    } else if (error.message.includes('Invalid response')) {
      errorMessage = 'Received invalid response from cart service.';
    }

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? {
          status: statusCode,
          responseData: error.response?.data
        } : undefined
      },
      { status: statusCode }
    );
  }
}
