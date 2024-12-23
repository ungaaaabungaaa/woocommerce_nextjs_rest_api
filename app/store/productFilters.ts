interface FilterOptions {
  color?: string;
  size?: string;
  gender?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  sortBy?: "price-asc" | "price-desc";
}

interface Product {
  id: number;
  name: string;
  price: string;
  featured: boolean;
  date_created: string;
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
      ];

      return conditions.every((condition) => condition);
    })
    .sort((a, b) => {
      // Sort by price if specified
      if (filters.sortBy === "price-asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      if (filters.sortBy === "price-desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });
}
