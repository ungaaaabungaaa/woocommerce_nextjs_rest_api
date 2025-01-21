"use client";
import Link from "next/link";
import { useWishlist } from "@/context/wishlistContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

export function WishlistPopUp() {
  const { wishlistCount, removeFromWishlist, wishlistItems } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<WishlistItem[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="w-full text-white bg-transparent z-40 sticky top-12 dark:text-black">
      <nav className="container mx-auto mt-1 max-w-7xl">
        <div className="flex align-middle items-end flex-col">
          {wishlistProducts.length === 0 ? (
            <div className="w-1/5 bg-black dark:bg-white p-4 rounded-lg border border-gray-700 dark:border-gray-200">
              <div className="w-full pb-2">
                <div className="bg-black text-white dark:bg-white dark:text-black">
                  <p className="text-start text-gray-200 dark:text-gray-700">
                    Your WishList is Empty
                  </p>
                  <p className="text-start text-gray-200 dark:text-gray-700 text-sm mt-2">
                    0 products
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full text-white bg-transparent z-40 sticky top-12 z-99 dark:text-black">
              <nav className="container mx-auto mt-1 max-w-7xl">
                <div className="flex align-middle items-end flex-col">
                  <div className="w-3/5 bg-black dark:bg-white p-4 rounded-lg   border border-gray-700 dark:border-gray-200  ">
                    <>
                      <div className="border-b border-gray-200 pb-3">
                        <h2 className="font-semibold">Your Wishlist</h2>
                        <p className="text-sm text-gray-600">
                          {wishlistCount} items
                        </p>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {wishlistProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex gap-4 py-4 border-b border-gray-100 group"
                          >
                            <div className="relative w-20 h-20 bg-gray-50 rounded">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <Link
                                href={`/product/${product.slug}`}
                                className="text-sm font-medium hover:underline line-clamp-2"
                              >
                                {product.name}
                              </Link>
                              <p className="text-sm font-semibold mt-1">
                                ${product.regular_price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 mt-2">
                        <Link
                          href="/wishlist"
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          View all
                        </Link>
                      </div>
                    </>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
