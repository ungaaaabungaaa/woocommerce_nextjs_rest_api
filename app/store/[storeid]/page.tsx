"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import ChipsChategoriesFilter from "../Chips_Filters";

interface Params {
  storeid: string;
}

// Filters
// Product Display

function StoreId({ params }: { params: Params }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/getproductscategories`, {
        params: { category: decodeURIComponent(params.storeid) },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.products &&
          response.data.products.length > 0
        ) {
          // data for the products
          setError(null);
        } else {
          setError("No products found for this category.");
          toast.error("No products found", {
            position: "top-center",
            theme: "dark",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("😭😭😭 No Products Exist!!!");
        toast.error("No Products Exist!!!", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      });
  }, [params.storeid]);

  function ViewProduct(id: any): void {
    console.log(id);
    router.push(`/product/${id}`);
  }

  const sanitizeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <>
      <div>
        {error ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white dark:bg-white dark:text-black">
            <ToastContainer />
            <p className="mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-center">
              {error}
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              color="default"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="bg-black dark:bg-white">
            <br></br>
            <ToastContainer />
            <br></br>

            <div className="container mx-auto px-4 py-8">
              <Breadcrumbs
                itemClasses={{
                  item: "text-white/60 dark:text-black data-[current=true]:text-white",
                  separator: "text-white/40 dark:text-black/40",
                }}
              >
                <BreadcrumbItem
                  href="/"
                  className="text-white dark:text-black hover:font-bold"
                >
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem
                  href="/store"
                  className="text-white dark:text-black"
                >
                  Store
                </BreadcrumbItem>

                <BreadcrumbItem
                  href={`/store/${params.storeid}`}
                  className="text-white dark:text-black"
                >
                  {decodeURIComponent(params.storeid)}
                </BreadcrumbItem>
              </Breadcrumbs>
              <br></br>
              <h2 className="text-2xl lg:text-3xl font-medium text-white dark:text-black">
                {decodeURIComponent(params.storeid)}
              </h2>
              <br></br>
              <ChipsChategoriesFilter
                highlight={decodeURIComponent(params.storeid).toUpperCase()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StoreId;
