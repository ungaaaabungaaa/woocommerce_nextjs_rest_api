"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
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
      <SheetContent
        side="right"
        className="w-full sm:max-w-md h-[80vh] sm:h-full bottom-0 sm:bottom-auto"
      >
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-auto py-4">
          {/* Cart items will go here */}
          <p>Cart items will be displayed here.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={closeCart}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
