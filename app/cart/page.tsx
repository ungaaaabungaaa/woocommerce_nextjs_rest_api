"use client";

import { useCartKey } from "../../hooks/useCartKey";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Tag, Package, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/cartcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Minus, Plus, Trash2 } from "lucide-react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { debounce } from "lodash";

interface CartItem {
  item_key: string;
  id: number;
  name: string;
  desc: string;
  price: string;
  quantity: { value: number };
  featured_image: string;
}

interface CartData {
  items: CartItem[];
  totals: {
    subtotal: string;
    total: string;
  };
}

export default function Cart() {
  const { cartKey, loading, error } = useCartKey();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const router = useRouter();
  const { fetchCartDetails } = useCart();
  const [user, setUser] = useState(null);

  // Fetch cart details with debouncing
  const fetch_Cart_Details = useCallback(async () => {
    if (!cartKey) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`;
      const response = await axios.get(url, { params: { cart_key: cartKey } });
      setCartData(response.data);
    } catch (err) {
      console.error("Error fetching cart details:", err);
      toast.error("Error fetching cart details", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    }
  }, [cartKey]);

  const debouncedFetchCartDetails = useMemo(
    () => debounce(fetch_Cart_Details, 500),
    [fetch_Cart_Details]
  );

  useEffect(() => {
    if (cartKey) {
      debouncedFetchCartDetails();
    }

    return () => {
      debouncedFetchCartDetails.cancel();
    };
  }, [cartKey, debouncedFetchCartDetails]);

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Update item quantity
  const updateItemQuantity = useCallback(
    async (itemKey: string, quantity: number) => {
      if (!cartKey) return;

      try {
        const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;
        await axios({
          method: "post",
          url: url,
          data: { quantity: quantity.toString() },
          headers: { "Content-Type": "application/json" },
          params: { cart_key: cartKey },
        });
        debouncedFetchCartDetails();
      } catch (err: any) {
        console.error("Error:", err.response?.data);
        toast.error("Failed To Update Cart", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    },
    [cartKey, debouncedFetchCartDetails]
  );

  // Remove item from cart
  const removeItem = useCallback(
    async (itemKey: string) => {
      if (!cartKey) return;

      try {
        const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;
        await axios.delete(url, { params: { cart_key: cartKey } });
        debouncedFetchCartDetails();
      } catch (err) {
        console.error("Error removing item:", err);
        toast.error("Error removing item", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    },
    [cartKey, debouncedFetchCartDetails]
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    if (!cartKey) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/clear`;
      await axios.post(url, {}, { params: { cart_key: cartKey } });
      debouncedFetchCartDetails();
    } catch (err) {
      console.error("Error clearing cart:", err);
      toast.error("Error clearing cart", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    }
  }, [cartKey, debouncedFetchCartDetails]);

  // Handle checkout click
  const handleCheckoutClick = useCallback(() => {
    if (user) {
      router.push("/auth/checkout");
    } else {
      router.push("/checkout");
    }
  }, [user, router]);

  // Memoized total price
  const totalPrice = useMemo(() => {
    return cartData
      ? (Number.parseFloat(cartData.totals.total) / 100).toFixed(2)
      : "0.00";
  }, [cartData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading cart. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black dark:bg-white text-white dark:text-black">
      <ToastContainer />
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Section */}
          <div className="flex-1">
            <div className="flex justify-between items-baseline mb-8">
              <h1 className="text-2xl font-bold">
                Your Bag ({" "}
                <span className="text-2xl font-bold">
                  {cartData?.items.length || 0} )
                </span>
              </h1>
            </div>

            {cartData && cartData.items.length > 0 ? (
              <div className="space-y-6">
                {cartData.items.map((item) => (
                  <div key={item.item_key} className="py-4 lg:py-8 cart-card">
                    <div className="cart-card-1">
                      {/* Image */}
                      <div className="relative w-32 h-40 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={item.featured_image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="cart-card-2 my-2">
                      <h3 className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-green-600">
                        • Available immediately
                      </p>
                      <br />
                      <Button
                        onClick={() => removeItem(item.item_key)}
                        size="sm"
                        className="flex items-center gap-2 bg-red text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                    <div className="cart-card-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full">
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.item_key,
                                item.quantity.value - 1
                              )
                            }
                            className="p-2"
                            disabled={item.quantity.value <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-medium">
                            {item.quantity.value}
                          </span>
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.item_key,
                                item.quantity.value + 1
                              )
                            }
                            className="p-2"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart-card-4">
                      <p className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-xl font-semibold tracking-[-0.015em] mt-2">
                        ${Number.parseFloat(item.price) / 100}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={() => window.history.back()}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Cart Summary Sidebar */}
          {cartData && cartData.items.length > 0 && (
            <div className="w-full lg:w-[400px] space-y-6 flex align-middle justify-normal flex-col text-white dark:text-black">
              <div className="space-y-4">
                <br className="hidden lg:block" />
                <br className="hidden lg:block" />
                <br className="hidden lg:block" />
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Promo codes</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Can be added in the next step
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4" />
                  <span className="font-medium">Shipping Cost</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is calculated at checkout
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCheckoutClick}
                  className="w-full"
                  size="lg"
                >
                  CHECKOUT
                </Button>

                <Button
                  onClick={clearCart}
                  className="w-full bg-red text-white"
                  size="lg"
                >
                  Clear Cart
                </Button>

                <Button
                  onClick={() => window.history.back()}
                  className="w-full bg-black text-white dark:bg-white dark:text-black"
                  size="lg"
                >
                  CONTINUE SHOPPING
                </Button>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Express PayPal Checkout
                </p>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="space-y-2">
                    <Star className="h-5 w-5 mx-auto" />
                    <p>Secure</p>
                  </div>
                  <div className="space-y-2">
                    <Tag className="h-5 w-5 mx-auto" />
                    <p>Discounts</p>
                  </div>
                  <div className="space-y-2">
                    <Package className="h-5 w-5 mx-auto" />
                    <p>Eco</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
