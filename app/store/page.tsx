'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import FullScreenStoreBanner from "@/app/component/FullScreenStoreBanner";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from 'next/image';
import { useCartKey } from '../../hooks/useCartKey';
import { useCart } from '../../context/cartcontext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Params {
  storeid: string;
}

interface Product {
  id: any;
  type: any;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_created?: string;
  featured?: boolean;
  images: { src: string }[];
  categories: { name: string, slug: string }[];
  short_description: string;
  attributes?: { name: string, options: string[] }[];
}


function StorePage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [sortOption, setSortOption] = useState("featured");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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
    .get(`/api/getproduct`)
    .then((response) => {
      if (response.data && response.data.products && response.data.products.length > 0) {
        setProducts(response.data.products);
        console.log(response.data.products);
        setFilteredProducts(response.data.products);
        setError(null);
      } else {
        setError("No products found.");
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
}, []);

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

  // Apply Gender Filter
  if (selectedGender) {
    result = result.filter(product => 
      product.categories.some(cat => 
        cat.slug.toLowerCase().includes(selectedGender.toLowerCase())
      )
    );
  }

  // Apply Color Filter
  if (selectedColor) {
    result = result.filter(product => 
      product.attributes?.some(attr => 
        attr.name.toLowerCase() === 'color' && 
        attr.options.some(option => 
          option.toLowerCase() === selectedColor.toLowerCase()
        )
      )
    );
  }

  // Apply Size Filter
  if (selectedSize) {
    result = result.filter(product => 
      product.attributes?.some(attr => 
        attr.name.toLowerCase() === 'size' && 
        attr.options.some(option => 
          option.toLowerCase() === selectedSize.toLowerCase()
        )
      )
    );
  }

  setFilteredProducts(result);
}, [products, sortOption, selectedGender, selectedColor, selectedSize]);

const router = useRouter();
function ViewProduct(id: any): void {
  console.log(id);
  router.push(`/product/${id}`); 
}

const sanitizeHTML = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

return (
  <>
<div>
  {error ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white dark:bg-white dark:text-black">
      <ToastContainer />
      <p className="mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-center">{error}</p>
      <Button onClick={() => (window.location.href = "/")} color="default">
        Continue Shopping
      </Button>
    </div>
  ) : (
    <div className="bg-black dark:bg-white">
      <br></br>
      <ToastContainer />
      <FullScreenStoreBanner 
        title={"Welcome"} 
        subtitle="Studio Universal Store" 
        backgroundImageUrl="https://images.unsplash.com/photo-1558898452-e5c989f41b27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcGluZ3xlbnwwfHwwfHx8MA%3D%3D" 
      />
      <div className="container mx-auto px-4 py-8">
      <div className="w-full flex align-middle justify-end">
      <div className="w-full lg:w-1/2 flex flex-col align-middle justify-end sm:flex-row gap-4 mb-4">
          <div className="w-full sm:w-1/2">
            <Select
              label="Filters"
              className= "w-full bg-white text-black dark:bg-white rounded-xl"
              selectionMode="multiple"
              onSelectionChange={(keys) => {
                const selectedValues = Array.from(keys) as string[];
                setSelectedGender(selectedValues.find(v => ['mens', 'womens', 'kids'].includes(v)) || null);
                setSelectedSize(selectedValues.find(v => ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'].includes(v)) || null);
                setSelectedColor(selectedValues.find(v => ['red', 'green', 'blue', 'yellow', 'black', 'white', 'pink', 'gray'].includes(v)) || null);
              }}
            >
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="mens">Men</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="womens">Women</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="kids">Kids</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="xs">XS</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="s">S</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="m">M</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="l">L</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="xl">XL</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="2xl">2XL</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="3xl">3XL</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="4xl">4XL</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="red">Red</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="green">Green</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="blue">Blue</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="yellow">Yellow</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="black">Black</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="white">White</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="pink">Pink</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="gray">Gray</SelectItem>
            </Select>
          </div>
          <div className="w-full sm:w-1/2">
            <Select
              label="Sort by"
              className= "w-full bg-white text-black dark:bg-white rounded-xl"
              selectedKeys={[sortOption]}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0] as string;
                setSortOption(selectedValue);
              }}
            >
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="newest">Newest</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="featured">Featured</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="low-high">Price: Low to High</SelectItem>
              <SelectItem className="bg-white text-black dark:bg-black dark:text-white"  key="high-low">Price: High to Low</SelectItem>
            </Select>
          </div>
        </div>
      </div>


        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              role="button"
              key={product.id}
              tabIndex={0}
              aria-label={`View product: ${product.name}`}
              onClick={() => ViewProduct(product.id)}
              shadow="none"
              className="group relative bg-card border-muted min-w-[150px] rounded-lg flex flex-col cursor-pointer"
            >
              <CardBody onClick={() => ViewProduct(product.id)}>
                <div
                  role="img"
                  aria-label={`Image of ${product.name}`}
                  className="aspect-portrait relative overflow-hidden rounded-lg bg-muted group"
                >
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src={product.images[1].src}
                    alt={`${product.name} hover`}
                    fill
                    className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>

                <p className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] mt-2">
                  {product.name}
                </p>

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

                 
                  {product.type === "simple" && (
                   <Button 
                   onClick={(e) => {
                   e.stopPropagation(); // Prevent triggering card's onClick
                   addToCart(product.id);
                   }}
                                                       
                  className="ml-2"
                  >
                  Add to Cart
                  </Button>
                )}
                </div>

                <p className="max-w-[26rem] text-left text-base/6 text-white dark:text-black mt-2">
                  {sanitizeHTML(product.short_description)}
                </p>
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

export default StorePage;


