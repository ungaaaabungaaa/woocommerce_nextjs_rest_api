"use client";
import React, { useEffect, useState } from "react";
import ProductGrid from "../component/productgrid"; // Ensure the correct import path
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  productId: string;
  title: string;
  description: string;
  image: string;
  hoverimage: string;
  isNew?: boolean;
  price: string;
  sale_price: string;
  regular_price: string;
  slug: string;
  type: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    productId: "1",
    title: "Training Shoes",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://images.unsplash.com/photo-1706029831385-c3388fa66b5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hoverimage:
      "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isNew: true,
    price: "$129.99",
    sale_price: "29$",
    regular_price: "29$",
    slug: "training-shoes",
    type: "simple",
  },
  // ... other sample products
];

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/getproduct`
      );
      const fetchedProducts: Product[] = response.data.products.map(
        (product: any) => ({
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
        })
      );
      setProducts(fetchedProducts);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching products:", error);
      toast.error("Error fetching products", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
      return;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sanitizeDescription = (description: string) => {
    return description.replace(/<[^>]+>/g, "");
  };

  // Fallback to sample products if products is empty
  const limitedProducts = (
    products.length > 0 ? products : sampleProducts
  ).slice(0, 8);

  return (
    <div className="w-full h-full py-4">
      <ToastContainer />
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 dark:text-black font-sans">
        Featured Products.
      </h2>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ProductGrid
          products={limitedProducts.map((product: any) => ({
            ...product,
            description: sanitizeDescription(product.description),
          }))}
        />
      )}
    </div>
  );
}

export default FeaturedProducts;
