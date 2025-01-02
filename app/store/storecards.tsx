import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";

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
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-4">
      {safeProducts.map((product) => (
        <Card
          key={product.id}
          shadow="none"
          className="group relative bg-card border-muted rounded-lg flex flex-col cursor-pointer"
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
                    <span className="bg-white text-black rounded-full p-1 text-sm font-medium flex items-center justify-center w-8 h-8">
                      New
                    </span>
                  </div>
                )}

                {product.sale_price && product.regular_price && (
                  <div className="absolute left-2 bottom-2 z-10" role="status">
                    <span className="bg-white text-black rounded-lg p-2 text-sm font-medium flex items-center justify-center">
                      Sale
                    </span>
                  </div>
                )}
              </div>
            </Link>

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
