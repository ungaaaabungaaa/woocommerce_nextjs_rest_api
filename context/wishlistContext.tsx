"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import {
  showWishlist,
  storeWishlist,
  removeWishlistItem,
  clearWishlist,
} from "@/helper/wishlistHelper";

interface WishlistContextType {
  wishlistCount: number;
  wishlistItems: number[]; // Add this line
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);

  useEffect(() => {
    setWishlistItems(showWishlist());
  }, []);

  const addToWishlist = (id: number) => {
    storeWishlist(id);
    setWishlistItems(showWishlist());
  };

  const removeFromWishlist = (id: number) => {
    removeWishlistItem(id);
    setWishlistItems(showWishlist());
  };

  const clearAllWishlist = () => {
    clearWishlist();
    setWishlistItems([]);
  };

  const isInWishlist = (id: number) => wishlistItems.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount: wishlistItems.length,
        wishlistItems, // Add this line
        addToWishlist,
        removeFromWishlist,
        clearWishlist: clearAllWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
