import { NextRequest, NextResponse } from 'next/server';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3',
  queryStringAuth: true // Force Basic Authentication
});

// Define the response data structure
interface ResponseData {
  success: boolean;
  products: any[]; 
  error?: string;
  debugInfo?: any;
}

// GET handler for fetching products by category
export async function GET(req: NextRequest) {
  const responseData: ResponseData = {
    success: false,
    products: [],
  };

  const url = new URL(req.url);
  const categorySlug = url.searchParams.get('category');
  const perPage = url.searchParams.get('perPage') || 50;

  if (!categorySlug) {
    responseData.error = 'Category slug is required';
    return NextResponse.json(responseData, { status: 400 });
  }

  try {
    // First, fetch the category to get its ID
    const categoriesResponse = await api.get('products/categories', {
      slug: categorySlug,
    });

    // Debug: Log the category search results
    console.log('Category Search Results:', categoriesResponse.data);

    // Check if category exists
    if (categoriesResponse.data.length === 0) {
      responseData.error = `No category found with slug: ${categorySlug}`;
      responseData.debugInfo = {
        message: 'Category not found',
        attemptedSlug: categorySlug
      };
      return NextResponse.json(responseData, { status: 404 });
    }

    // Get the category ID
    const categoryId = categoriesResponse.data[0].id;

    // Fetch products filtered by category ID
    const productsResponse = await api.get('products', {
      per_page: parseInt(perPage as string),
      category: categoryId, // Use category ID for filtering
    });

    // Debug: Log the products
    console.log('Products Found:', productsResponse.data);

    // Prepare the response
    responseData.success = true;
    responseData.products = productsResponse.data;
    responseData.debugInfo = {
      categoryId: categoryId,
      categorySlug: categorySlug,
      productsCount: productsResponse.data.length
    };

    // Send response
    return NextResponse.json(responseData);
  } catch (error: any) {
    // Handle errors
    console.error('Error fetching products:', error);

    responseData.error = error.message || 'Failed to fetch products by category';
    responseData.debugInfo = {
      errorDetails: error.response ? error.response.data : error.toString(),
      categorySlug: categorySlug
    };

    return NextResponse.json(responseData, { status: 500 });
  }
}

// test url  http://localhost:3000/api/getproductscategories?category=Women's Clothing