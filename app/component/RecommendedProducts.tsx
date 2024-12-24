"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  url: string;
}

interface RecommendedProductsProps {
  products: Product[];
}

export function RecommendedProducts({ products }: RecommendedProductsProps) {
  const router = useRouter();

  const handleProductClick = (url: string) => {
    router.push(url);
  };

  return (
    <div className="mt-8">
      <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white dark:text-black">
        Recommended Products
      </h2>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => handleProductClick(product.url)}
            className="cursor-pointer bg-gray-800 dark:bg-gray-200 rounded-lg overflow-hidden transition-transform hover:scale-105 text-left p-0 border-none"
            aria-label={`View ${product.name}`}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 bg-white dark:bg-black">
              <h3 className="text-sm font-medium text-black dark:text-white truncate">
                {product.name}
              </h3>
              <p className="mt-1 text-sm dark:text-gray-300 text-gray-600">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
