"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/card";
import { useWishlist } from "@/context/wishlistContext";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@nextui-org/button";

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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalProducts: number;
  productsPerPage: number;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalProducts,
  productsPerPage,
}: PaginationProps) {
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  if (totalPages <= 1) {
    return (
      <div className="flex justify-end w-full mt-8">
        <div className="text-sm text-muted-foreground">
          Viewing {totalProducts} products
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full mt-8">
      <div className="flex items-center gap-2">
        {totalPages > 1 && (
          <Button
            isIconOnly
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="min-w-8 h-8 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 dark:text-black text-white" />
          </Button>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-8 h-8 ${
              currentPage === page
                ? "bg-black text-white dark:bg-white dark:text-black "
                : "bg-black text-white dark:bg-white dark:text-black bg-gray-800 dark:bg-gray-100 "
            }`}
          >
            {page}
          </Button>
        ))}

        {totalPages > 1 && (
          <Button
            isIconOnly
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="min-w-8 h-8 bg-transparent"
          >
            <ChevronRight className="h-4 w-4 dark:text-black text-white" />
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Viewing {startProduct} - {endProduct} of {totalProducts} products
      </div>
    </div>
  );
}

function StoreCards({ products = [] }: { products?: Product[] }) {
  const safeProducts = products || [];
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;

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

  // Calculate pagination values
  const totalPages = Math.ceil(safeProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = safeProducts.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full">
        {currentProducts.map((product) => (
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

                <div className="absolute right-3 top-3 z-5 bg-white rounded-full p-3">
                  <Heart
                    onClick={() => handleWishlistToggle(product.id)}
                    className={`h-3 w-3 ${
                      isInWishlist(product.id as any)
                        ? "fill-current text-black"
                        : "stroke-current text-gray-500"
                    }`}
                  />
                </div>

                {product.sale_price && product.regular_price && (
                  <div className="absolute left-2 bottom-2 z-5" role="status">
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
                    <span className="text-gray-500 dark:text-gray-400 text-base md:text-xl lg:text-2xl line-through mr-2">
                      ${product.regular_price}
                    </span>
                    <span className="text-red font-semibold text-base md:text-xl lg:text-2xl">
                      ${product.sale_price}
                    </span>
                  </div>
                ) : product.regular_price ? (
                  <span className="text-red font-semibold text-base md:text-xl lg:text-2xl">
                    ${product.regular_price}
                  </span>
                ) : product.type === "variable" ? (
                  <span className="text-red font-semibold text-base md:text-xl lg:text-2xl">
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalProducts={safeProducts.length}
        productsPerPage={productsPerPage}
      />
    </div>
  );
}

export default StoreCards;
