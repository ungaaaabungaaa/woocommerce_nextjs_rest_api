"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartKey } from "@/hooks/useCartKey";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartcontext";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  const router = useRouter();

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

  useEffect(() => {
    if (cartKey && isOpen) {
      fetch_Cart_Details();
    }
  }, [cartKey, isOpen]);

  const fetch_Cart_Details = async () => {
    if (isLoading) return;

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

      if (cartData) {
        const updatedItems = cartData.items.map((item) =>
          item.item_key === itemKey
            ? { ...item, quantity: { value: quantity } }
            : item
        );
        setCartData({ ...cartData, items: updatedItems });
      }

      await Promise.all([fetchCartDetails(cartKey), fetch_Cart_Details()]);
    } catch (err: any) {
      console.error("Error:", err.response?.data);
      await fetch_Cart_Details();
      throw err;
    }
  };

  const removeItem = async (itemKey: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;

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
        className="w-[400px] sm:w-[540px] bg-black text-white dark:bg-white dark:text-black flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-white dark:text-black">
            <h1 className="text-2xl font-bold">
              Add to Bag! ({" "}
              <span className="text-2xl font-bold">
                {cartData?.items.length || 0} )
              </span>
            </h1>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {cartData && cartData.items.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto">
                {cartData.items.map((item) => (
                  <div key={item.item_key} className="py-2 cart-card-two">
                    <div className="cart-card-1-two">
                      <div className="relative w-32 h-40 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={item.featured_image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="my-2 cart-card-2-two">
                      <h3 className="text-white dark:text-black text-left text-balance text-base md:text-xl font-semibold tracking-[-0.015em]">
                        {item.name}
                      </h3>
                      <p className="text-white dark:text-black text-left text-balance text-base md:text-xl lg:text-xl font-semibold tracking-[-0.015em] mt-2 mb-1">
                        ${parseFloat(item.price) / 100}
                      </p>
                      <p className="text-sm  mb-2 ">
                        Qty: {item.quantity.value} x $
                        {parseFloat(item.price) / 100}
                      </p>

                      <Button
                        onClick={() => removeItem(item.item_key)}
                        size="sm"
                        className="flex items-center gap-2 bg-red text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                    <div className="cart-card-3-two"></div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="mt-6 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${parseFloat(cartData.totals.subtotal) / 100}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${parseFloat(cartData.totals.total) / 100}</span>
                </div>
              </div>

              {/* Fixed Checkout Button */}
              <div className="pt-4 mt-4">
                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-white text-black  dark:bg-black dark:text-white rounded-full"
                >
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => window.history.back()}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
