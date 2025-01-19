"use client";
import React, { useState } from "react";
import {
  storeWishlist,
  showWishlist,
  removeWishlistItem,
  clearWishlist,
  checkWishlist,
  wishlistCount,
} from "@/helper/wishlistHelper";

const TestPage: React.FC = () => {
  const [testId, setTestId] = useState<number>(101); // Example ID for testing
  const [wishlist, setWishlist] = useState<number[]>([]); // Local state for displaying wishlist
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false); // Local state to check if ID is in wishlist
  const [count, setCount] = useState<number>(0); // Wishlist count

  // Update the wishlist from storage
  const updateWishlist = (): void => {
    const currentWishlist = showWishlist();
    setWishlist(currentWishlist);
    setCount(wishlistCount());
    setIsInWishlist(checkWishlist(testId));
  };

  // Handlers for each function
  const handleAddToWishlist = (): void => {
    storeWishlist(testId);
    console.log(`Added ID ${testId} to wishlist`);
    updateWishlist();
  };

  const handleShowWishlist = (): void => {
    const currentWishlist = showWishlist();
    console.log("Wishlist Items:", currentWishlist);
    updateWishlist();
  };

  const handleRemoveFromWishlist = (): void => {
    removeWishlistItem(testId);
    console.log(`Removed ID ${testId} from wishlist`);
    updateWishlist();
  };

  const handleClearWishlist = (): void => {
    clearWishlist();
    console.log("Wishlist cleared");
    updateWishlist();
  };

  const handleCheckWishlist = (): void => {
    const isInWishlist = checkWishlist(testId);
    console.log(`Is ID ${testId} in wishlist?`, isInWishlist);
    updateWishlist();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Wishlist Test Page</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Test ID:
          <input
            type="number"
            className="block text-sm font-medium bg-black dark:bg-white text-white dark:text-black mb-1"
            value={testId}
            onChange={(e) => setTestId(Number(e.target.value))}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={handleAddToWishlist}>Add to Wishlist</button>
        <button onClick={handleShowWishlist}>Show Wishlist</button>
        <button onClick={handleRemoveFromWishlist}>Remove from Wishlist</button>
        <button onClick={handleClearWishlist}>Clear Wishlist</button>
        <button onClick={handleCheckWishlist}>Check Wishlist</button>
      </div>
      <h2>Wishlist Count: {count}</h2>
      <h3>
        Is ID {testId} in Wishlist? {isInWishlist ? "Yes" : "No"}
      </h3>
      <h3>Current Wishlist:</h3>
      <ul>
        {wishlist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
