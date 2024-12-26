interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  hoverimage: string;
  isNew?: boolean;
  price: string;
  slug: string;
  sale_price: string;
  regular_price: string;
  productId: string;
  type: string;
  date_created?: string; // Assuming it's a string, if it's a Date object, adjust accordingly
  featured?: boolean; // Adding this property
  name?: string; // Adding this property
  short_description?: string; // Adding this property
  images?: { src: string }[]; // Adding images array with src property
}

export type SortOption =
  | "LOW - HIGH"
  | "HIGH - LOW"
  | "NEWEST"
  | "FEATURED"
  | string;

export function sortProducts(
  products: Product[],
  sortOption: SortOption
): Product[] {
  // Ensure a defensive copy of the products array
  const productsCopy = [...products];

  const sortedProducts = (() => {
    switch (sortOption) {
      case "LOW - HIGH":
        return productsCopy.sort((a, b) => {
          const priceA = parseFloat(a.price || "0");
          const priceB = parseFloat(b.price || "0");
          return priceA - priceB;
        });

      case "HIGH - LOW":
        return productsCopy.sort((a, b) => {
          const priceA = parseFloat(a.price || "0");
          const priceB = parseFloat(b.price || "0");
          return priceB - priceA;
        });

      case "NEWEST":
        return productsCopy.sort((a, b) => {
          const dateA = new Date(a.date_created || "");
          const dateB = new Date(b.date_created || "");
          return dateB.getTime() - dateA.getTime();
        });

      case "FEATURED":
        return productsCopy.filter((product) => product.featured === true);

      default:
        return productsCopy;
    }
  })();

  // Map the sorted products to the required format
  return sortedProducts.map((product) => ({
    id: product.id,
    productId: product.id.toString(),
    title: product.name || "Untitled Product",
    description: product.short_description || product.description || "",
    image: product.images?.[0]?.src || "",
    hoverimage: product.images?.[1]?.src || product.images?.[0]?.src || "",
    isNew: product.featured || false,
    price: `$${product.price || "0.00"}`,
    regular_price: product.regular_price || "",
    sale_price: product.sale_price || "",
    slug: product.slug || "",
    type: product.type || "unknown",
  }));
}
