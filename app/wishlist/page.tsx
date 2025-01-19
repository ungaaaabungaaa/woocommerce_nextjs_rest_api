import React from "react";

function page() {
  return (
    <div className="w-full flex align-middle justify-center items-center bg-black text-white dark:bg-white dark:text-black">
      <div className=" bg-black text-white dark:bg-white dark:text-black w-full max-w-7xl">
        <main className="px-4 py-8">
          <h1>WishList</h1>
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
