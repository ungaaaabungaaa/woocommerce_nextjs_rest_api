"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import { useCartKey } from "../../hooks/useCartKey";
import { useCart } from "../../context/cartcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

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

export default function ProductGrid({
  products = [],
}: {
  products?: Product[];
}) {
  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();
  const safeProducts = products || [];

  if (safeProducts.length === 0) {
    return (
      <div className="text-white text-center p-4">No products available</div>
    );
  }

  const addToCart = async (productId: string, prodQuantity: number = 1) => {
    if (loading) {
      console.log("Cart key is still loading...");
      return;
    }
    if (cartKeyError) {
      console.error("Error with cart key:", cartKeyError);
      toast.error("Error with cart key", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
      return;
    }

    const endpoint = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/add-item?cart_key=${cartKey}`;
    try {
      const response = await axios.post(
        endpoint,
        new URLSearchParams({
          id: productId,
          quantity: prodQuantity.toString(),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Item added to cart:", response.data);
      await fetchCartDetails(cartKey);
    } catch (error: any) {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="bg-black text-white dark:bg-white dark:text-black min-h-screen p-6">
      <ToastContainer />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white bg-black dark:text-black dark:bg-white">
          {safeProducts.map((product) => (
            <Card
              key={product.id}
              shadow="none"
              className="group relative bg-card border-muted min-w-[310px] rounded-lg flex flex-col cursor-pointer"
            >
              <CardBody>
                <Link href={`/product/${product.id}`} passHref>
                  <div className="aspect-portrait relative overflow-hidden rounded-lg bg-muted group">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <Image
                      src={product.hoverimage}
                      alt={`${product.title} hover`}
                      fill
                      className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />

                    {product.isNew && (
                      <div
                        className="absolute right-2 top-2 z-10"
                        aria-label="New product"
                      >
                        <span className="bg-white text-black rounded-full p-5 text-sm font-medium flex items-center justify-center w-8 h-8">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <h2 className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] mt-2">
                  {product.title}
                </h2>

                <div className="flex justify-between items-center mt-2">
                  {product.sale_price && product.regular_price ? (
                    <div className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 text-1xl line-through mr-2">
                        ${product.regular_price}
                      </span>
                      <span className="text-white dark:text-black font-bold text-1xl">
                        ${product.sale_price}
                      </span>
                    </div>
                  ) : product.regular_price ? (
                    <span className="text-white dark:text-black font-bold">
                      ${product.regular_price}
                    </span>
                  ) : product.type === "variable" ? (
                    <span className="text-white dark:text-black font-bold">
                      {product.price}
                    </span>
                  ) : null}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
