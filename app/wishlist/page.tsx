"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useWishlist } from "@/context/wishlistContext";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { useCartKey } from "@/hooks/useCartKey";
import { useCart } from "@/context/cartcontext";
import ProductCarouselCategories from "@/app/component/ ProductCarouselCategories";

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
  hoverimage: string;
  regular_price: string;
  sale_price: string;
  slug: string;
  type: string;
}

export default function WishlistPage() {
  const { wishlistCount, removeFromWishlist, wishlistItems } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<WishlistItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistItems.length === 0) {
        setWishlistProducts([]);
        return;
      }

      try {
        const ids = wishlistItems.join(",");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/wishlist?ids=${ids}`
        );
        const mappedProducts = response.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.thumbnail,
          regular_price: product.regular_price,
          sale_price: product.sale_price,
          slug: product.slug || "",
          type: "simple",
        }));

        setWishlistProducts(mappedProducts);
      } catch (err) {
        setError("Failed to load wishlist products");
        console.error("Error loading wishlist products:", err);
      }
    };

    fetchWishlistProducts();
  }, [wishlistItems]);

  const calculateDiscount = (regularPrice: string, salePrice: string) => {
    const regular = Number.parseFloat(regularPrice);
    const sale = Number.parseFloat(salePrice);
    const discount = ((regular - sale) / regular) * 100;
    return Math.round(discount);
  };

  const addToCartApiCallSimple = async (id: string, quantity: string) => {
    if (loading) {
      console.log("Cart key is still loading...");
      return;
    }
    if (cartKeyError) {
      console.error("Error with cart key:", cartKeyError);
      return;
    }
    const endpoint = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/add-item?cart_key=${cartKey}`;
    try {
      const response = await axios.post(
        endpoint,
        new URLSearchParams({
          id: id,
          quantity: quantity.toString(),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      await fetchCartDetails(cartKey); // Refresh cart data after adding an item
      if (typeof window !== "undefined" && (window as any).openCart) {
        (window as any).openCart();
      }
    } catch (error: any) {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
      return;
    }
  };

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-24 py-8 text-white dark:text-black bg-black dark:bg-white min-w-full">
      <div className="w-full flex align-middle justify-center items-center bg-black text-white dark:bg-white dark:text-black">
        <div className="w-full max-w-7xl">
          <main className="px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">
                Wishlist{" "}
                <span className="text-sm">({wishlistCount} products)</span>
              </h1>
            </div>
            {wishlistProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white dark:bg-white dark:text-black">
                <p className="mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-center">
                  Empty Wishlist
                </p>
                <br></br>
                <Button
                  onClick={() => (window.location.href = "/")}
                  color="default"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-4">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-card border-muted rounded-lg flex flex-col cursor-pointer"
                  >
                    <div className="aspect-portrait relative overflow-hidden rounded-lg bg-muted group">
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      <div className="absolute right-3 top-3 z-10 rounded-full p-3 bg-white hover:bg-opacity-100 hover:visible opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Trash2
                          onClick={() => removeFromWishlist(product.id)}
                          className="h-3 w-3 text-black"
                        />
                      </div>

                      {product.sale_price && product.regular_price && (
                        <div
                          className="absolute left-2 bottom-2 z-10"
                          role="status"
                        >
                          <span className="bg-red text-white rounded-lg p-2 text-sm font-medium flex items-center justify-center">
                            -
                            {calculateDiscount(
                              product.regular_price,
                              product.sale_price
                            )}
                            %
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h2 className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] mt-1">
                        {product.name}
                      </h2>
                    </div>
                    <div>
                      <div className="flex flex-col lg:flex-row lg:space-x-2">
                        <Button
                          href={`/product/${product.id}`}
                          className="w-full lg:w-1/3 text-center bg-white text-black dark:bg-black dark:text-white py-2 px-4 text-xs rounded-full mt-1"
                        >
                          View
                        </Button>

                        <button
                          onClick={() =>
                            addToCartApiCallSimple(product.id.toString(), "1")
                          }
                          className="w-full lg:w-1/3 text-center bg-red text-white py-2 px-4 text-xs rounded-full mt-2"
                        >
                          Add To Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <br></br>
      <br></br>
      <ProductCarouselCategories category="trending-now"></ProductCarouselCategories>
      <ProductCarouselCategories category="best-sellers"></ProductCarouselCategories>
    </div>
  );
}
