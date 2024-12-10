'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/card";
import axios from 'axios';
import { useCartKey } from '../../hooks/useCartKey';
import { useCart } from '../../context/cartcontext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  hoverimage: string;
  isNew: boolean;
  price: string;
  sale_price:string;
  regular_price:string;
  slug: string;
  date_created: string;
  type: string; 
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

        <p className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em]">
          {product.title}
        </p>

        <div className="flex justify-between items-center">
          {product.sale_price && product.regular_price ? (
            <div className="flex items-center">
              <span className="text-gray-500 dark:text-gray-400 text-1xl line-through">
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

        <p className="max-w-[26rem] text-left text-base/6 text-neutral-200">
          {product.description}
        </p>
       
      </CardBody>
    </Card>
  );
};

const ProductCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // HTML sanitization function
  const sanitizeHTML = (html: string) => {
    // Remove HTML tags and decode HTML entities
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/getproduct`);
      const fetchedProducts = response.data.products
        // Filter to only include featured products
        .filter((product: any) => product.featured)
        .map((product: any) => ({
          id: product.id,
          title: sanitizeHTML(product.name),
          description: sanitizeHTML(product.short_description || product.description).substring(0, 100) + '...',
          image: product.images?.[0]?.src || 'https://via.placeholder.com/800',
          hoverimage: product.images?.[1]?.src || product.images?.[0]?.src || 'https://via.placeholder.com/800',
          isNew: product.featured,
          price: `$${product.price}`,
          regular_price: product.regular_price,
          sale_price: product.sale_price,
          slug: product.slug,
          date_created: product.date_created,
          type: product.type || "simple", // Default to "simple" if not provided
        }))
        // Sort by date_created in descending order (newest first)
        .sort((a: Product, b: Product) => {
          return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();
        });
  
      setProducts(fetchedProducts);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching products:', error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

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
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 dark:text-black font-sans">
        Newest Products 
      </h2>
      <br></br>
      <div className="w-full overflow-hidden gap-0.5  p-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>    
  );
};

export default ProductCarousel;