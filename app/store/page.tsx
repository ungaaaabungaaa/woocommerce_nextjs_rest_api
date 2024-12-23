"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterProducts } from "./productFilters";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

interface Product {
  id: string;
  // Add other product properties here
}

interface FilterOptions {
  sortBy: string;
  // Add other filter options here
}

// Define the type for the filterProducts function
type FilterProductsFunction = (
  products: Product[],
  options: FilterOptions
) => Product[];

function StorePage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get<{ products: Product[] }>(`/api/getproduct`)
      .then((response) => {
        if (
          response.data &&
          response.data.products &&
          response.data.products.length > 0
        ) {
          setError(null);
        } else {
          setError("No products found.");
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
  }, []);

  function ViewProduct(id: string): void {
    console.log(id);
    router.push(`/product/${id}`);
  }

  const sanitizeHTML = (html: string): string => {
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
            <br />
            <ToastContainer />
            <br />
            <div className="container mx-auto px-4 py-8">
              <Breadcrumbs
                itemClasses={{
                  item: "text-white/60 dark:text-black data-[current=true]:text-white",
                  separator: "text-white/40 dark:text-black/40",
                }}
              >
                <BreadcrumbItem
                  as="button"
                  onClick={() => router.back()}
                  className="text-white dark:text-black hover:font-bold"
                >
                  Back
                </BreadcrumbItem>
                <BreadcrumbItem href="/" className="text-white dark:text-black">
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem>Studio Store</BreadcrumbItem>
              </Breadcrumbs>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StorePage;
