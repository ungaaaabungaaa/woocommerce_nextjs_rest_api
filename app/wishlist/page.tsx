"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import {
  showWishlist,
  wishlistCount,
  removeWishlistItem,
} from "@/helper/wishlistHelper";
import axios from "axios";
import ProductCarouselCategories from "../component/ ProductCarouselCategories";
import { Button } from "@nextui-org/button";

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
  const [count, setCount] = useState<number>(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<WishlistItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistItems = await showWishlist();
        setWishlist(wishlistItems);
        setCount(wishlistCount());
      } catch (err) {
        setError("Failed to load wishlist IDs");
        console.error("Error loading wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) {
        return;
      }

      try {
        const ids = wishlist.join(",");

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
  }, [wishlist]);

  const handleRemoveFromWishlist = (productId: number) => {
    removeWishlistItem(productId);
    setWishlistProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
    setCount((prev) => prev - 1);
  };

  const calculateDiscount = (regularPrice: string, salePrice: string) => {
    const regular = parseFloat(regularPrice);
    const sale = parseFloat(salePrice);
    const discount = ((regular - sale) / regular) * 100;
    return Math.round(discount);
  };

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full flex align-middle justify-center items-center bg-black text-white dark:bg-white dark:text-black">
      <div className="w-full max-w-7xl">
        <main className="px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Wishlist <span className="text-sm">({count} products)</span>
            </h1>
          </div>
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white dark:bg-white dark:text-black">
              <p className="mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-center">
                Empty Whislist
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
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="absolute right-3 top-3 z-10 rounded-full p-3 bg-white hover:bg-opacity-100 hover:visible opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Trash2
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="h-3 w-3 text-black"
                      />
                    </div>

                    {product.sale_price && product.regular_price && (
                      <div className="absolute left-2 bottom-2 z-10 ">
                        <span className="bg-red-500 text-white rounded-lg p-2 text-sm font-medium">
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
                    <h2 className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] mt-2">
                      {product.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )}
          <br></br>
          <br></br>
        </main>
        <ProductCarouselCategories category="trending-now"></ProductCarouselCategories>
        <ProductCarouselCategories category="best-sellers"></ProductCarouselCategories>
      </div>
    </div>
  );
}
