'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import FullScreenStoreBanner from "@/app/component/FullScreenStoreBanner";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

interface Params {
  storeid: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_created?: string;
  featured?: boolean;
  images: { src: string }[];
  categories: { name: string }[];
}

function StoreId({ params }: { params: Params }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    axios
      .get(`/api/getproductscategories`, { params: { category: params.storeid } })
      .then((response) => {
        if (response.data && response.data.products && response.data.products.length > 0) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
          setError(null);
        } else {
          setError("No products found for this category.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("😭😭😭 No Products Exist!!!");
      });
  }, [params.storeid]);

  useEffect(() => {
    let result = [...products];

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => {
          const dateA = a.date_created ? new Date(a.date_created).getTime() : 0;
          const dateB = b.date_created ? new Date(b.date_created).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "low-high":
        result.sort((a, b) => parseFloat(a.price || a.regular_price) - parseFloat(b.price || b.regular_price));
        break;
      case "high-low":
        result.sort((a, b) => parseFloat(b.price || b.regular_price) - parseFloat(a.price || a.regular_price));
        break;
    }

    setFilteredProducts(result);
  }, [products, sortOption]);

  return (
    <>
      <div>
        {error ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="mb-4 text-white text-3xl sm:text-4xl md:text-6xl font-bold text-center">{error}</p>
            <Button
              onClick={() => (window.location.href = "/")}
              color="default"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div>
            <br></br>
            <FullScreenStoreBanner 
                title={params.storeid} 
                subtitle="Studio Universal Store" 
                backgroundImageUrl="https://images.unsplash.com/photo-1558898452-e5c989f41b27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcGluZ3xlbnwwfHwwfHx8MA%3D%3D" 
              />
            <div className="container mx-auto px-4 py-8">
            <div className="w-full flex justify-end">
              <div className="w-full md:w-1/4 px-4 mb-4 flex align-middle justify-end ">
                <Select
                  label="Sort by"
                  selectedKeys={[sortOption]}
                  className="bg-white text-black rounded-xl"
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys)[0] as string;
                    setSortOption(selectedValue);
                  }}
                >
                  <SelectItem className="bg-white text-black" key="newest">Newest</SelectItem>
                  <SelectItem className="bg-white text-black" key="featured">Featured</SelectItem>
                  <SelectItem className="bg-white text-black" key="low-high">Price: Low to High</SelectItem>
                  <SelectItem className="bg-white text-black" key="high-low">Price: High to Low</SelectItem>
                </Select>
              </div>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <img
                        src={product.images[0]?.src || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.categories.map(cat => cat.name).join(', ')}
                      </p>
                      <p className="font-bold">
                        ${product.sale_price || product.regular_price}
                        {product.sale_price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.regular_price}
                          </span>
                        )}
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => console.log(`Product ID: ${product.id}`)}
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StoreId;
