import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/card";
import { useWishlist } from "@/context/wishlistContext";
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
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const calculateDiscount = (regularPrice: string, salePrice: string) => {
    const regular = Number.parseFloat(regularPrice);
    const sale = Number.parseFloat(salePrice);
    const discount = ((regular - sale) / regular) * 100;
    return Math.round(discount);
  };

  const handleWishlistToggle = (productId: string) => {
    if (isInWishlist(productId as any)) {
      removeFromWishlist(productId as any);
    } else {
      addToWishlist(productId as any);
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
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                  src={product.hoverimage || "/placeholder.svg"}
                  alt={`${product.title} hover`}
                  fill
                  className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </Link>

              <div className="absolute right-3 top-3 z-10 bg-white rounded-full p-3 ">
                <Heart
                  onClick={() => handleWishlistToggle(product.id)}
                  className={`h-3 w-3 ${isInWishlist(product.id as any) ? "fill-current text-black" : "stroke-current text-gray-500"}`}
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

            <div className="flex justify-between items-center">
              {product.sale_price && product.regular_price ? (
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-base md:text-xl lg:text-2xl line-through mr-2">
                    ${product.regular_price}
                  </span>
                  <span className="text-white dark:text-black font-semibold text-base md:text-xl lg:text-2xl">
                    ${product.sale_price}
                  </span>
                </div>
              ) : product.regular_price ? (
                <span className="text-white dark:text-black font-semibold text-base md:text-xl lg:text-2xl">
                  ${product.regular_price}
                </span>
              ) : product.type === "variable" ? (
                <span className="text-white dark:text-black font-semibold text-base md:text-xl lg:text-2xl">
                  {product.price}
                </span>
              ) : null}
            </div>

            <p className="text-white dark:text-black text-left text-balance text-1xl tracking-[-0.015em] capitalize">
              {product.title}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default StoreCards;
