import { FilterState } from "../types/types";

export interface Product {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  attributes: Array<{
    id: number;
    name: string;
    slug: string;
    options: string[];
    variation: boolean;
  }>;
  date_created: string;
}

export const filterProducts = (
  products: Product[],
  filters: FilterState
): Product[] => {
  return products.filter((product) => {
    if (filters.gender.length > 0) {
      const genderAttribute = product.attributes.find(
        (attr) => attr.name === "Gender" || attr.slug === "pa_gender"
      );
      if (!genderAttribute?.options.length) return false;

      const hasMatchingGender = filters.gender.some((gender) =>
        genderAttribute.options
          .map((g) => g.toLowerCase())
          .includes(gender.toLowerCase())
      );
      if (!hasMatchingGender) return false;
    }

    if (filters.sizes.length > 0) {
      const sizeAttribute = product.attributes.find(
        (attr) => attr.name === "Size" || attr.slug === "pa_size"
      );
      if (!sizeAttribute?.options.length) return false;

      const hasMatchingSize = filters.sizes.some((size) =>
        sizeAttribute.options
          .map((s) => s.toUpperCase())
          .includes(size.toUpperCase())
      );
      if (!hasMatchingSize) return false;
    }

    if (filters.colors.length > 0) {
      const colorAttribute = product.attributes.find(
        (attr) => attr.name === "Color" || attr.slug === "pa_color"
      );
      if (!colorAttribute?.options.length) return false;

      const hasMatchingColor = filters.colors.some((color) =>
        colorAttribute.options
          .map((c) => c.toLowerCase())
          .includes(color.toLowerCase())
      );
      if (!hasMatchingColor) return false;
    }

    if (filters.priceRange > 0) {
      const productPrice = parseFloat(product.price);
      return !isNaN(productPrice) && productPrice <= filters.priceRange;
    }

    return true;
  });
};

export const sortProducts = (
  products: Product[],
  sortOption: string
): Product[] => {
  const sortedProducts = [...products];

  switch (sortOption) {
    case "NEWEST":
      return sortedProducts.sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
      );

    case "LOW - HIGH":
      return sortedProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );

    case "HIGH - LOW":
      return sortedProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );

    case "FEATURED":
      return sortedProducts;

    default:
      return sortedProducts;
  }
};

export const processProducts = (
  products: Product[],
  filters: FilterState,
  sortOption?: string
): Product[] => {
  let processedProducts = filterProducts(products, filters);
  if (sortOption) {
    processedProducts = sortProducts(processedProducts, sortOption);
  }
  return processedProducts;
};
