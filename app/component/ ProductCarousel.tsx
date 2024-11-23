'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import axios from 'axios';

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
}

interface ProductCardProps {
  product: Product;
}



async function addToCart(productId: any, quantity = 1) {
  try {
    console.log(productId);
    const response = await axios.post('http://localhost:3000/api/addtocart', {
      productId,
      quantity,
    });
    if (response.data.success) {
      alert('Product added to cart!');
    } else {
      alert(`Failed to add to cart: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
}

const ProductCard = ({ product }: ProductCardProps) => (
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
          <span className="bg-white text-black text-xs px-2 py-1 rounded">New</span>
        )}
      </div>
      <br />
      <Button 
        size="md"
        className="w-full bg-white text-black"
        onClick={()=>addToCart(product.id,1)}
      >
        Add to cart
      </Button>
    </CardBody>
  </Card>
);

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
        .map((product: any) => ({
          id: product.id,
          title: sanitizeHTML(product.name),
          description: sanitizeHTML(product.short_description || product.description).substring(0, 100) + '...',
          image: product.images?.[0]?.src || 'https://via.placeholder.com/800',
          hoverimage: product.images?.[1]?.src || product.images?.[0]?.src || 'https://via.placeholder.com/800',
          isNew: product.featured,
          price: `$${product.price}`,
          slug: product.slug,
          date_created: product.date_created
        }))
        // Sort by date_created in descending order (newest first)
        .sort((a: Product, b: Product) => {
          return new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
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
    <div className="w-full h-full py-20">
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