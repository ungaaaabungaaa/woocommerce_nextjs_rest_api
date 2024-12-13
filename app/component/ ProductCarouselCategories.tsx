'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import axios from 'axios';
import { useCartKey } from '../../hooks/useCartKey';
import { useCart } from '../../context/cartcontext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  hoverimage: string;
  isNew: boolean;
  price: string;
  slug: string;
  date_created: string;
  sale_price:string;
  regular_price:string;
  type: string;
  categories: { id: number; name: string; slug: string }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();
  const router = useRouter();

  const ViewProduct = async (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const addToCart = async (productId: string, prodQuantity: number = 1) => {
    if (loading) {
      console.log('Cart key is still loading...');
      return;
    }
    if (cartKeyError) {
      console.error('Error with cart key:', cartKeyError);
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
      await fetchCartDetails(cartKey);
    } catch (error: any) {
      console.error('Error adding item to cart:', error.response?.data || error.message);
      toast.error("Error adding item to cart", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  return (
    <Card 
      role="button" 
      tabIndex={0} 
      aria-label={`View product: ${product.title}`}
      onClick={() => ViewProduct(product.id)}
      onKeyDown={(e) => handleKeyDown(e, () => ViewProduct(product.id))}
      shadow="none" 
      className="group relative bg-card border-muted min-w-[310px] rounded-lg flex flex-col cursor-pointer"
    > 
      <CardBody
        onClick={() => ViewProduct(product.id)}
      >
        <div 
          role="img" 
          aria-label={`Image of ${product.title}`}
          className="aspect-portrait relative overflow-hidden rounded-lg bg-muted group"
        >
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
              role="status"
            >
              <span className="bg-white text-black rounded-full p-5 text-sm font-medium flex items-center justify-center w-8 h-8">
                New
              </span>
            </div>
          )}
        </div>
        <p className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] mt-2">
          {product.title}
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
          
          <Button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card's onClick
              addToCart(product.id);
            }}
            aria-label={`Add ${product.title} to cart`}
            className="ml-2"
          >
            Add to Cart
          </Button>
        </div>

        <p className="max-w-[26rem] text-left text-base/6 text-white dark:text-black mt-2">
          {product.description}
        </p>
        
      </CardBody>
    </Card>
  );
};

interface ProductCarouselCategoriesProps {
  category: string;
}

const ProductCarouselCategories = ({ category }: ProductCarouselCategoriesProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // HTML sanitization function
  const sanitizeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/getproduct`);
      const fetchedProducts = response.data.products
        // Filter products based on the provided category
        .filter((product: any) => product.categories.some((cat: any) => cat.slug === category))
        .map((product: any) => ({
          id: product.id,
          title: sanitizeHTML(product.name),
          description: sanitizeHTML(product.short_description || product.description).substring(0, 100) + '...',
          image: product.images?.[0]?.src || 'https://via.placeholder.com/800',
          hoverimage: product.images?.[1]?.src || product.images?.[0]?.src || 'https://via.placeholder.com/800',
          isNew: product.featured,
          regular_price: product.regular_price,
          sale_price: product.sale_price,
          price: `$${product.price}`,
          slug: product.slug,
          date_created: product.date_created,
          type: product.type || "simple", 
          categories: product.categories || [],
        }));

      setProducts(fetchedProducts);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching products:', error);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  if (error) {
    return (
      <div className="w-full h-full py-20 text-white text-center">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="w-full h-full py-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 mb-4">
        <h2 
          className="text-xl md:text-5xl font-bold text-neutral-200 dark:text-black font-sans"
          aria-label={`Products in ${category} category`}
        >
          {category}
        </h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => scrollCarousel('left')} 
            className="group/button bg-white text-black dark:bg-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <IconArrowLeft className="h-5 w-5 bg-white text-black dark:bg-black dark:text-white group-hover/button:rotate-12 transition-transform duration-300" />
          </button>
          <button 
            onClick={() => scrollCarousel('right')} 
            className="group/button bg-white text-black dark:bg-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <IconArrowRight className="h-5 w-5 text-black dark:bg-black dark:text-white group-hover/button:-rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden bg-black dark:bg-white p-4">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide bg-black dark:bg-white"
          role="list"
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              role="listitem" 
              className="mr-4 last:mr-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>    
  );
};

export default ProductCarouselCategories;