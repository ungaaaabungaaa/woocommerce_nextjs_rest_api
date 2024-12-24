interface FilterOptions {
  color?: string;
  size?: string;
  gender?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  isNew?: boolean; // Filter for newest products
  isFeatured?: boolean; // Filter for featured products
  sortBy?: "price-asc" | "price-desc"; // Sorting by price
  filterByFeatured?: boolean; // Additional flag to filter featured products
  filterByNewest?: boolean; // Additional flag to filter newest products
}

interface Product {
  id: number;
  name: string;
  price: string;
  featured: boolean;
  date_created: string;
  description?: string;
  short_description?: string;
  images?: Array<{ src: string }>;
  regular_price?: string;
  sale_price?: string;
  slug: string;
  type?: string;
  attributes: Array<{
    name: string;
    options: string[];
  }>;
  categories: Array<{
    name: string;
    slug: string;
  }>;
}

export function filterProducts(products: Product[], filters: FilterOptions) {
  return products
    .filter((product) => {
      // Match all filter conditions
      const conditions: any[] = [
        // Color filter
        !filters.color ||
          product.attributes.some(
            (attr) =>
              attr.name === "Color" && attr.options.includes(filters.color!)
          ),

        // Size filter
        !filters.size ||
          product.attributes.some(
            (attr) =>
              attr.name === "Size" && attr.options.includes(filters.size!)
          ),

        // Gender filter (from categories)
        !filters.gender ||
          product.categories.some((cat) =>
            cat.slug.includes(filters.gender!.toLowerCase())
          ),

        // Price range filter
        !filters.priceRange ||
          (parseFloat(product.price) >= filters.priceRange.min &&
            parseFloat(product.price) <= filters.priceRange.max),

        // New arrivals filter (within last 30 days)
        !filters.isNew ||
          new Date(product.date_created) >=
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),

        // Featured products filter
        !filters.isFeatured || product.featured,

        // Filter by featured products (if filterByFeatured is true)
        !filters.filterByFeatured || product.featured,

        // Filter by newest products (if filterByNewest is true)
        !filters.filterByNewest ||
          new Date(product.date_created) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Newest products within the last 7 days
      ];

      return conditions.every((condition) => condition);
    })
    .map((product) => {
      // Map filtered products to the desired structure
      return {
        id: product.id,
        productId: product.id.toString(),
        title: product.name,
        description: product.short_description || product.description,
        image: product.images?.[0]?.src || "https://via.placeholder.com/800",
        hoverimage:
          product.images?.[1]?.src ||
          product.images?.[0]?.src ||
          "https://via.placeholder.com/800",
        isNew: product.featured,
        price: `$${product.price}`,
        regular_price: product.regular_price,
        sale_price: product.sale_price,
        slug: product.slug,
        type: product.type || "simple",
      };
    });
}
