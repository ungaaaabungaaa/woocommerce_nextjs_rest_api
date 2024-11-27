'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import axios from 'axios';
import { useCartKey } from '../../hooks/useCartKey';
import { useCart } from '../../context/cartcontext';

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
  type: string; // e.g., "simple" or other types
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();




  const ViewProduct = async (productId: string) => {
    console.log(productId)
  };

  const addToCart = async (productId: string, prodQuantity: number = 1) => {
    
    if (loading) {
      console.log('Cart key is still loading...');
      return;
    }
    if (cartKeyError) {
      console.error('Error with cart key:', cartKeyError);
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
      await fetchCartDetails(cartKey); // Refresh cart data after adding an item
    } catch (error: any) {
      console.error('Error adding item to cart:', error.response?.data || error.message);
    }
  };

  return (
    <Card className="group relative bg-card border-muted min-w-[280px] p-4 rounded-lg flex flex-col gap-4">    
      <CardHeader className="line-clamp-1 text-2xl text-white">
        {product.title}
      </CardHeader>
      <CardBody>
        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted group">
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
        </div>
        <p className="text-sm text-white mt-2">
          {product.description}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-white font-bold">{product.price}</span>
          {product.isNew && (
            <span className=" text-white text-xs px-2 py-1 rounded-full">New</span>
          )}
        </div>
        <br />
        {product.type === "simple" && (
          <Button 
            size="md"
            className="w-full bg-white text-black"
            onClick={() => addToCart(product.id, 1)}
          >
            Add to cart
          </Button>
        )}
        <br></br>
        <Button 
          size="md"
          className="w-full bg-black text-white"
          onClick={() => ViewProduct(product.id)}
        >
          View Product
        </Button>
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
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans">
        Newest Products 
      </h2>
      <div className="w-full overflow-hidden bg-black p-4">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>    
  );
};

export default ProductCarousel;
