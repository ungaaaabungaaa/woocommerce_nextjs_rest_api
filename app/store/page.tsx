"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import ChipsChategoriesFilter from "./Chips_Filters";
import StoreCards from "./storecards";
import { filterProducts } from "./productFilters";
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
  const [products, setProducts] = useState<Product[]>([]);

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get<{ products: Product[] }>(`/api/getproduct`)
      .then((response) => {
        if (
          response.data &&
          response.data.products &&
          response.data.products.length > 0
        ) {
          setFilteredProducts(response.data.products);
          const fetchedProducts: Product[] = response.data.products.map(
            (product: any) => ({
              id: product.id,
              productId: product.id.toString(),
              title: product.name,
              description: product.short_description || product.description,
              image:
                product.images?.[0]?.src || "https://via.placeholder.com/800",
              hoverimage:
                product.images?.[1]?.src ||
                product.images?.[0]?.src ||
                "https://via.placeholder.com/800",
              isNew: product.featured,
              price: `$${product.price}`,
              regular_price: product.regular_price,
              sale_price: product.sale_price,
              slug: product.slug,
              type: product.type || "simple",
            })
          );
          setProducts(fetchedProducts);
          setAllProducts(fetchedProducts);
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

  const categories = [
    { name: "Accessories", count: 6 },
    { name: "Core", count: 10 },
    { name: "Footwear", count: 0 },
    { name: "Kids' Clothing", count: 9 },
    { name: "Men's Clothing", count: 11 },
    { name: "New Arrivals", count: 10 },
    { name: "Shop By Fit", count: 10 },
    { name: "T-Shirts", count: 4 },
    { name: "Women's Clothing", count: 11 },
  ];

  interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    hoverimage: string;
    isNew?: boolean;
    price: string;
    slug: string;
    sale_price: string;
    regular_price: string;
    productId: string;
    type: string;
  }

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
          <div className="bg-black dark:bg-white overflow-hidden">
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
              <br></br>
              <h2 className="text-2xl lg:text-3xl font-medium text-white dark:text-black">
                Studio Store
              </h2>
              <br></br>
              <ChipsChategoriesFilter
                categories={categories}
                onFilterChange={(filters) => {
                  console.log("Filtered List ", filters);
                  const filteredProducts_X = filterProducts(
                    filteredProducts,
                    filters
                  );
                  console.log(filteredProducts_X);
                }}
                onSortChange={(sortOption) => {
                  console.log("Sorted List", sortOption);
                  // sort options are like this

                  // NEWEST
                  // FEATURED
                  // LOW-HIGH
                  // HIGH-LOW
                  // am not able to just send this string and sort my list
                }}
              />
              <StoreCards products={allProducts}></StoreCards>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StorePage;

// inside the productfilter.TS only do the mapping return data so its easier

// then usesate to apply the filtered list to the product store
// then cart popup
// rounded edges for the filters
// align the bottons in the filters mobile 50% 50%
// alignments
// checkoutpage improvements
