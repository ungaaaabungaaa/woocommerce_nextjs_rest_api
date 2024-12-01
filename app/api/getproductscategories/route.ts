import { NextRequest, NextResponse } from 'next/server';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// Initialize the WooCommerce API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3',
  queryStringAuth: true
});

// Define the response data structure
interface ResponseData {
  success: boolean;
  products: any[];
  error?: string;
  debugInfo?: any;
}

// GET handler for fetching products by category and name
export async function GET(req: NextRequest) {
  const responseData: ResponseData = {
    success: false,
    products: [],
  };

  const url = new URL(req.url);
  const searchTerm = url.searchParams.get('category'); // We'll use this as a general search term
  const perPage = url.searchParams.get('perPage') || 50;

  if (!searchTerm) {
    responseData.error = 'Search term is required';
    return NextResponse.json(responseData, { status: 400 });
  }

  try {
    // First, fetch the category to get its ID
    const categoriesResponse = await api.get('products/categories', {
      slug: searchTerm,
    });

    let allProducts: any[] = [];
    let categoryId = null;

    // If category exists, get products from that category
    if (categoriesResponse.data.length > 0) {
      categoryId = categoriesResponse.data[0].id;
      const categoryProductsResponse = await api.get('products', {
        per_page: parseInt(perPage as string),
        category: categoryId,
      });
      allProducts = [...categoryProductsResponse.data];
    }

    // Search for products by name
    const nameSearchResponse = await api.get('products', {
      per_page: parseInt(perPage as string),
      search: searchTerm, // This will search product names and descriptions
    });

    // Combine products from both searches and remove duplicates
    const combinedProducts = [...allProducts, ...nameSearchResponse.data];
    const uniqueProducts = Array.from(new Map(combinedProducts.map(item => [item.id, item])).values());

    // Prepare the response
    responseData.success = true;
    responseData.products = uniqueProducts;
    responseData.debugInfo = {
      categoryId: categoryId,
      searchTerm: searchTerm,
      totalProductsFound: uniqueProducts.length,
      categoryMatchCount: allProducts.length,
      nameMatchCount: nameSearchResponse.data.length
    };

    // Send response
    return NextResponse.json(responseData);
  } catch (error: any) {
    // Handle errors
    console.error('Error fetching products:', error);

    responseData.error = error.message || 'Failed to fetch products';
    responseData.debugInfo = {
      errorDetails: error.response ? error.response.data : error.toString(),
      searchTerm: searchTerm
    };

    return NextResponse.json(responseData, { status: 500 });
  }
}