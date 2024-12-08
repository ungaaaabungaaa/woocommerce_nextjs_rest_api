'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import FullScreenStoreBanner from "@/app/component/FullScreenStoreBanner";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from 'next/image';
import { useCartKey } from '../../../hooks/useCartKey';
import { useCart } from '../../../context/cartcontext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Params {
  storeid: string;
}

interface Product {
  id: any;
  type:any;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_created?: string;
  featured?: boolean;
  images: { src: string }[];
  categories: { name: string }[];
  short_description: string;  // Change from { name: string }[] to string
}

function StoreId({ params }: { params: Params }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("featured");

  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();
  


  const addToCart = async (productId: string, prodQuantity: number = 1) => {
   


  
      
    if (loading) {
        console.log('Cart key is still loading...');
        return;
    }
    if (cartKeyError) {
        console.error('Error with cart key:', cartKeyError);
        toast.error( "Error with cart key", {
                position: "top-center",
                theme: "dark",
                autoClose: 5000,
        });
        return;
    }
    const endpoint = `http://13.235.113.210/wp-json/cocart/v2/cart/add-item?cart_key=${cartKey}`;
    try {
        const response = await axios.post(
          endpoint,
          new URLSearchParams({
            id: productId,
            quantity: prodQuantity.toString(),
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log('Item added to cart:', response.data);
        toast.success("Item added to cart", {
                position: "top-center",
                theme: "dark",
                autoClose: 5000,
        });
        
        await fetchCartDetails(cartKey); // Refresh cart data after adding an item
      } catch (error: any) {
        console.error('Error adding item to cart:', error.response?.data || error.message);
        toast.error( "Error adding item to cart", {
                position: "top-center",
                theme: "dark",
                autoClose: 5000,
        });
      }
  };


  useEffect(() => {
    axios
      .get(`/api/getproductscategories`, { params: { category: params.storeid } })
      .then((response) => {
        if (response.data && response.data.products && response.data.products.length > 0) {
          setProducts(response.data.products);
          console.log(response.data.products);
          setFilteredProducts(response.data.products);
          setError(null);
        } else {
          setError("No products found for this category.");
           toast.error( "No products found", {
                      position: "top-center",
                      theme: "dark",
                      autoClose: 5000,
            });
          
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("😭😭😭 No Products Exist!!!");
         toast.error( "No Products Exist!!!", {
                    position: "top-center",
                    theme: "dark",
                    autoClose: 5000,
          });
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

  const router = useRouter();
  function ViewProduct(id: any): void {
    console.log(id);
    router.push(`/product/${id}`); 
  }

  return (
    <>
      <div>
        {error ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white dark:bg-white dark:text-black">
            <ToastContainer />
            <p className="mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-center">{error}</p>
            <Button
              onClick={() => (window.location.href = "/")}
              color="default"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="bg-black dark:bg-white">
            <br></br>
            <ToastContainer />
            <FullScreenStoreBanner 
                title={params.storeid} 
                subtitle="Studio Universal Store" 
                backgroundImageUrl="https://images.unsplash.com/photo-1558898452-e5c989f41b27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcGluZ3xlbnwwfHwwfHx8MA%3D%3D" 
              />
            <div className="container mx-auto px-4 py-8 ">
            <div className="w-full flex justify-end">
              <div className="w-full md:w-1/4 px-4 mb-4 flex align-middle justify-end ">
                <Select
                  label="Sort by"
                  selectedKeys={[sortOption]}
                  className="bg-white text-black dark:bg-white rounded-xl"
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys)[0] as string;
                    setSortOption(selectedValue);
                  }}
                >
                  <SelectItem className="bg-white text-black dark:bg-black dark:text-white" key="newest">Newest</SelectItem>
                  <SelectItem className="bg-white text-black dark:bg-black dark:text-white" key="featured">Featured</SelectItem>
                  <SelectItem className="bg-white text-black dark:bg-black dark:text-white" key="low-high">Price: Low to High</SelectItem>
                  <SelectItem className="bg-white text-black dark:bg-black dark:text-white" key="high-low">Price: High to Low</SelectItem>
                </Select>
              </div>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card  
                  shadow="none"
                  key={product.id} 
                  className="group relative bg-card border-muted min-w-[280px] p-4 rounded-lg flex flex-col gap-4"
                >    
                  <CardHeader className="line-clamp-1 text-2xl text-white dark:text-black">
                    {product.name}
                  </CardHeader>
                  <CardBody>
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-muted group">
                      {product.images[0]?.src && (
                        <>
                          <Image
                            src={product.images[0].src}
                            alt={product.name}
                            fill
                            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                          />
                          {/* If you want a hover image, you'd need to add a second image */}
                          {/* This is just a placeholder - you may want to handle this differently */}
                          {product.images[1]?.src && (
                            <Image
                              src={product.images[1].src}
                              alt={`${product.name} hover`}
                              fill
                              className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            />
                          )}
                        </>
                      )}
                    </div>
                   <p className="text-sm text-white dark:text-black mt-2">
                      {product.short_description.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-white dark:text-black font-bold">
                        ${product.price}
                      </span>
                    </div>
                    <br />
                    {product.type === "simple" && (
                    <Button 
                        size="md"
                        className="w-full bg-white text-black dark:text-white dark:bg-black"
                        onClick={() => addToCart(product.id, 1)}
                      >
                      Add to cart
                    </Button>
                    )}
                    <br />
                    <Button 
                      size="md"
                      className="w-full bg-black text-white dark:bg-white dark:text-black"
                      onClick={() => ViewProduct(product.id)}
                    >
                      View Product
                    </Button>
                  </CardBody>
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
