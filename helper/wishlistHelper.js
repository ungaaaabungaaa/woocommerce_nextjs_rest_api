// wishlistHelper.js

const WISHLIST_KEY = "wishlist_items";

// Helper to get the current wishlist from storage
const getWishlist = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
};

// 1. Store wishlist (add item to the array)
export const storeWishlist = (id) => {
  if (!id) return;
  const wishlist = getWishlist();
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
};

// 2. Show wishlist (return all items)
export const showWishlist = () => {
  return getWishlist();
};

// 3. Remove item from wishlist
export const removeWishlistItem = (id) => {
  if (!id) return;
  const wishlist = getWishlist().filter((item) => item !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

// 4. Clear wishlist
export const clearWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};

// 5. Check if item is in wishlist
export const checkWishlist = (id) => {
  if (!id) return false;
  return getWishlist().includes(id);
};

// 6. Get wishlist count
export const wishlistCount = () => {
  return getWishlist().length;
};
