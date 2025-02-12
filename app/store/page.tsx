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
import { processProducts } from "./productFilters";
import { sortProducts } from "./sortProducts";

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

interface Category {
  id: number;
  name: string;
  count: number;
}

interface FilterOptions {
  sortBy: string;
}

function StorePage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0); // New state for total products count

  // Fetch categories
  useEffect(() => {
    axios
      .get("/api/getcategories")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          // Transform the API response to match the expected format
          const formattedCategories = response.data.map((category: any) => ({
            name: category.name,
            count: category.count,
          }));
          setCategories(formattedCategories);
        } else {
          console.error("No categories found");
          toast.error("Error loading categories", {
            position: "top-center",
            theme: "dark",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        toast.error("Error loading categories", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      });
  }, []);

  // Fetch products
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
          setTotalProductsCount(fetchedProducts.length); // Set the total products count
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
          <div className="container mx-auto px-4 py-8 bg-black text-white dark:bg-white dark:text-black w-full max-w-7xl">
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
              totalProducts={totalProductsCount} // Use the state variable here
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
