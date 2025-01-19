"use client";

import React, { useEffect, useState } from "react";
import {
  showWishlist,
  removeWishlistItem,
  clearWishlist,
  wishlistCount,
} from "@/helper/wishlistHelper";

export default function WishlistPage() {
  const [count, setCount] = useState<number>(0);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const wishlistItems = await showWishlist();
      setWishlist(wishlistItems);
      setCount(wishlistCount());
    };

    fetchWishlist();
  }, []);

  return (
    <div className="w-full flex align-middle justify-center items-center bg-black text-white dark:bg-white dark:text-black">
      <div className="w-full max-w-7xl">
        <main className="px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Wishlist <span className="text-sm">({count} products)</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ul>
              {wishlist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
