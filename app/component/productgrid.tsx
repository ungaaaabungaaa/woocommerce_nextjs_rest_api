'use client';

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import axios from 'axios';
import { useCartKey } from '../../hooks/useCartKey';
import { useCart } from '../../context/cartcontext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  hoverimage: string;
  isNew?: boolean;
  price: string;
  slug: string;
  productId: string;
  type: string;
}

export default function ProductGrid({ products = [] }: { products?: Product[] }) {
  // Always call hooks at the top of the component
  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();
  const router = useRouter();

  // Ensure products is always an array
  const safeProducts = products || [];

  // Guard clause to return early if no products are available
  if (safeProducts.length === 0) {
    return <div className="text-white text-center p-4">No products available</div>;
  }

  // Add to cart function
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
      await fetchCartDetails(cartKey); // Refresh the cart details after adding an item
    } catch (error: any) {
      console.error('Error adding item to cart:', error.response?.data || error.message);
    }
  };

 
  const ViewProduct = async (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="bg-black  text-white dark:bg-white text-black min-h-screen p-6">
      <ToastContainer />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white bg-black dark:text-black dark:bg-white">
          {safeProducts.map((product) => (
            <Card  shadow="none" key={product.id} className="group relative bg-card border-muted">
              <CardHeader className="line-clamp-1 text-2xl text-white dark:text-black">
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
                <p className="text-sm text-white dark:text-black mt-2">
                  {product.description}
                </p>
                <p className="text-sm text-white">
                  <span className="text-white dark:text-black font-bold">{product.price}</span>
                  
                </p>


              </CardBody>

              <CardFooter className="grid grid-cols-2 gap-2">
                <Button 
                  size="md"
                  className="w-full bg-black text-white"
                  onClick={() => ViewProduct(product.id.toString())}
                >
                  View Product
                </Button>

                {product.type === "simple" && (
                  <Button 
                    size="md"
                    className="w-full bg-white text-black"
                    onClick={() => addToCart(product.productId, 1)}
                  >
                    Add to cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
