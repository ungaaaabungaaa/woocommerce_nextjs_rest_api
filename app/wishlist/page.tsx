"use client";
import React, { useEffect, useState } from "react";
import {
  storeWishlist,
  showWishlist,
  removeWishlistItem,
  clearWishlist,
  checkWishlist,
  wishlistCount,
} from "@/helper/wishlistHelper";

function page() {
  const [count, setCount] = useState<number>(0); // Wishlist count
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    setCount(wishlistCount());
    setWishlist(showWishlist());
  }, []);

  return (
    <div className="w-full flex align-middle justify-center items-center bg-black text-white dark:bg-white dark:text-black">
      <div className=" bg-black text-white dark:bg-white dark:text-black w-full max-w-7xl">
        <main className="px-4 py-8">
          <div>
            <h1 className="text-3xl font-bold text-white dark:text-black">
              WishList <span className="text-sm">{count} products</span>
            </h1>
          </div>
          <div className="bg-black text-white dark:bg-white dark:text-black w-full max-w-7xl">
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

export default page;

// show the wishlist items
// make the api call
// get the data
// push it into the product cards
