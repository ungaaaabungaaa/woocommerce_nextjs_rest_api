'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody } from "@nextui-org/card";
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
  type: string; // e.g., "simple" or other types
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();
  const router = useRouter();

  const ViewProduct = async (productId: string) => {
    console.log(productId);
    router.push(`/product/${productId}`);
  };

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

  return (
    <Card onClick={() => ViewProduct(product.id)} shadow="none" className="group relative bg-card border-muted min-w-[310px] rounded-lg flex flex-col cursor-pointer"> 
      <CardBody onClick={() => ViewProduct(product.id)}>
        <div onClick={() => ViewProduct(product.id)} className="aspect-portrait relative overflow-hidden rounded-lg bg-muted group">
          <Image
            onClick={() => ViewProduct(product.id)}
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            onClick={() => ViewProduct(product.id)}
            src={product.hoverimage}
            alt={`${product.title} hover`}
            fill
            className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />

           <div className="absolute right-2 top-2 z-10">
           {product.isNew && (
            <span onClick={() => ViewProduct(product.id)} className="bg-white text-black rounded-full p-5 text-sm font-medium flex items-center justify-center w-8 h-8">
              New
            </span>
           )}
           </div>
        </div>
       
    

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
        </div>
        <p className="text-white dark:text-black">
          {product.title}
        </p>
        {/* {product.type === "simple" && (
          <Button 
            size="md"
            className="w-full bg-white text-black dark:bg-black dark:text-white"
            onClick={() => addToCart(product.id, 1)}
          >
            Add to cart
          </Button>
        )}
        <br></br>
        <Button 
          size="md"
          className="w-full bg-black text-white dark:bg-white dark:text-black"
          onClick={() => ViewProduct(product.id)}
        >
          View Product
        </Button> */}
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