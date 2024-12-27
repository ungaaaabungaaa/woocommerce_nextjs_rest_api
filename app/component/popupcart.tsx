"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartKey } from "@/hooks/useCartKey";
import { useRouter } from "next/router";
import { useCart } from "@/context/cartcontext";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

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

export function PopUpCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartKey, loading, error } = useCartKey();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCartDetails } = useCart();

  const openCart = async () => {
    setIsOpen(true);
    if (cartKey) {
      await fetch_Cart_Details();
    }
  };

  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    (window as any).openCart = openCart;

    return () => {
      delete (window as any).openCart;
    };
  }, [cartKey]);

  // Add a new useEffect to fetch cart details when cartKey changes
  useEffect(() => {
    if (cartKey && isOpen) {
      fetch_Cart_Details();
    }
  }, [cartKey, isOpen]);

  const fetch_Cart_Details = async () => {
    if (isLoading) return; // Prevent multiple simultaneous requests

    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`;
      const response = await axios.get(url, { params: { cart_key: cartKey } });
      setCartData(response.data);
    } catch (err) {
      console.error("Error fetching cart details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemQuantity = async (itemKey: string, quantity: number) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;
      await axios({
        method: "post",
        url: url,
        data: { quantity: quantity.toString() },
        headers: { "Content-Type": "application/json" },
        params: { cart_key: cartKey },
      });

      // Optimistically update the UI
      if (cartData) {
        const updatedItems = cartData.items.map((item) =>
          item.item_key === itemKey
            ? { ...item, quantity: { value: quantity } }
            : item
        );
        setCartData({ ...cartData, items: updatedItems });
      }

      // Fetch latest data
      await Promise.all([fetchCartDetails(cartKey), fetch_Cart_Details()]);
    } catch (err: any) {
      console.error("Error:", err.response?.data);
      // Revert optimistic update on error
      await fetch_Cart_Details();
      throw err;
    }
  };

  const removeItem = async (itemKey: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;

      // Optimistically update the UI
      if (cartData) {
        const updatedItems = cartData.items.filter(
          (item) => item.item_key !== itemKey
        );
        setCartData({ ...cartData, items: updatedItems });
      }

      await axios.delete(url, { params: { cart_key: cartKey } });
      await Promise.all([fetchCartDetails(cartKey), fetch_Cart_Details()]);
    } catch (err) {
      console.error("Error removing item:", err);
      // Revert optimistic update on error
      await fetch_Cart_Details();
    }
  };

  const clearCart = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/clear`;
      await axios.post(url, {}, { params: { cart_key: cartKey } });
      setCartData({ items: [], totals: { subtotal: "0", total: "0" } });
      await Promise.all([fetchCartDetails(cartKey), fetch_Cart_Details()]);
    } catch (err) {
      console.error("Error clearing cart:", err);
      await fetch_Cart_Details();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] border-none bg-black text-white dark:bg-white dark:text-black"
      >
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
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
                  {/* Rest of the cart item rendering remains the same */}
                  <div className="cart-card-1">
                    <div className="relative w-32 h-40 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={item.featured_image}
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
                    <br></br>
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
                    <p className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-xl font-semibold tracking-[-0.015em] mt-2">
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
                    </p>
                  </div>
                  <div className="cart-card-4">
                    <p className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-xl font-semibold tracking-[-0.015em] mt-2">
                      ${parseFloat(item.price) / 100}
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

        <SheetFooter>
          <SheetClose asChild>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Close
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
