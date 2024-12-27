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

export function PopUpCart() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the cart
  const openCart = () => setIsOpen(true);

  // Function to close the cart
  const closeCart = () => setIsOpen(false);

  // Expose the openCart function to the global window object
  useEffect(() => {
    (window as any).openCart = openCart;
    return () => {
      delete (window as any).openCart;
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          {/* Cart items will go here */}
          <p className="text-muted-foreground">
            Cart items will be displayed here.
          </p>
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
