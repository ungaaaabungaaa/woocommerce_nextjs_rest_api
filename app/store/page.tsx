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
import { filterProducts, processProducts } from "./productFilters";
import { sortProducts } from "./sortProducts";
interface Product {
  id: string;
}

interface FilterOptions {
  sortBy: string;
}

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

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

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
              image: product.images?.[0]?.src || "",
              hoverimage:
                product.images?.[1]?.src || product.images?.[0]?.src || "",
              isNew: product.featured,
              price: `$${product.price}`,
              regular_price: product.regular_price,
              sale_price: product.sale_price,
              slug: product.slug,
              type: product.type || "",
            })
          );
          setProducts(fetchedProducts);
          setAllProducts(fetchedProducts);
          setDisplayedProducts(fetchedProducts);
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
          <div className="container mx-auto px-4 py-8 bg-black text-white dark:bg-white dark:text-black w-full  max-w-7xl">
            <ToastContainer />
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
            <h2 className="text-2xl lg:text-3xl font-medium text-white dark:text-black">
              Studio Store
            </h2>
            <ChipsChategoriesFilter
              categories={categories}
              onFilterChange={(filters) => {
                const processedProducts = processProducts(
                  filteredProducts,
                  filters
                );
                setDisplayedProducts(processedProducts);
              }}
              onSortChange={(sortOption) => {
                const processedProducts = sortProducts(
                  filteredProducts,
                  sortOption.toString()
                );
                setDisplayedProducts(processedProducts);
              }}
            />
            <StoreCards products={displayedProducts}></StoreCards>
          </div>
        )}
      </div>
    </>
  );
}

export default StorePage;

// hello
