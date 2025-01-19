import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/card";
import {
  storeWishlist,
  checkWishlist,
  removeWishlistItem,
} from "@/helper/wishlistHelper";
import { Heart } from "lucide-react";

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

function StoreCards({ products = [] }: { products?: Product[] }) {
  const safeProducts = products || [];

  // Track wishlist status for each product
  const [wishlistStatus, setWishlistStatus] = useState<{
    [key: string]: boolean;
  }>({});

  // Set initial wishlist status for each product
  useEffect(() => {
    const initialWishlistStatus: { [key: string]: boolean } = {};
    safeProducts.forEach((product) => {
      if (product.id) {
        initialWishlistStatus[product.id] = checkWishlist(product.id as any);
      }
    });
    setWishlistStatus(initialWishlistStatus);
  }, [safeProducts]);

  const calculateDiscount = (regularPrice: string, salePrice: string) => {
    const regular = parseFloat(regularPrice);
    const sale = parseFloat(salePrice);
    const discount = ((regular - sale) / regular) * 100;
    return Math.round(discount);
  };

  const handleWishlistToggle = (productId: string) => {
    if (wishlistStatus[productId]) {
      removeWishlistItem(productId as any);
      setWishlistStatus((prevStatus) => ({
        ...prevStatus,
        [productId]: false,
      }));
    } else {
      storeWishlist(productId as any);
      setWishlistStatus((prevStatus) => ({ ...prevStatus, [productId]: true }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-4">
      {safeProducts.map((product) => (
        <Card
          key={product.id}
          shadow="none"
          className="group relative bg-card border-muted rounded-lg flex flex-col cursor-pointer"
        >
          <CardBody>
            <div className="aspect-portrait relative overflow-hidden rounded-lg bg-muted group">
              <Link href={`/product/${product.id}`} passHref>
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
              </Link>

              <div className="absolute right-3 top-3 z-10 bg-white rounded-full p-3">
                <Heart
                  onClick={() => handleWishlistToggle(product.id)}
                  className={`h-3 w-3 ${wishlistStatus[product.id] ? "fill-current text-black" : "stroke-current text-gray-500"}`}
                />
              </div>

              {product.sale_price && product.regular_price && (
                <div className="absolute left-2 bottom-2 z-10" role="status">
                  <span className="bg-red text-white rounded-lg p-2 text-sm font-medium flex items-center justify-center">
                    -
                    {calculateDiscount(
                      product.regular_price,
                      product.sale_price
                    )}
                    %
                  </span>
                </div>
              )}
            </div>

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

            <h2 className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] mt-2">
              {product.title}
            </h2>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default StoreCards;
