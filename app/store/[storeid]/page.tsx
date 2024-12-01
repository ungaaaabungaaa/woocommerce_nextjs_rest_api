"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FullScreenStoreBanner from "@/app/component/FullScreenStoreBanner";
import { Button } from "@nextui-org/button";

interface Params {
  storeid: string;
}

function StoreId({ params }: { params: Params }) {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`/api/getproductscategories`, { params: { category: params.storeid } })
      .then((response) => {
        if (response.data && response.data.products && response.data.products.length > 0) {
          setProducts(response.data.products);
          console.log(response.data.products);
          setError(null); // Reset error
        } else {
          setError("No products found for this category.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("😭😭😭 No Prodcuts Exist!!!");
      });
  }, [params.storeid]);

  return (
    <>
      <div>
        

        {error ? (
          <div style={{ textAlign: "center" }}>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
            
            <p className="mb-4 text-white text-3xl sm:text-4xl md:text-6xl font-bold text-center">{error}</p>
            <br></br>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-white text-black rounded-full"
            >
              Continue Shopping
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        ) : (
          <div>
            {/* Render your products */}
            <FullScreenStoreBanner title="Welcome to Studio Store" subtitle={params.storeid} />
             <br />
            

          </div>
        )}
      </div>
    </>
  );
}

export default StoreId;
