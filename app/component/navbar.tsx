"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import { Search, ShoppingBag, Truck } from "lucide-react";
import SiteLogo from "../../public/sitelogo.jpeg";
import { Badge } from "@nextui-org/badge";
import React from "react";
import { useCart } from '../../context/cartcontext';


export default function Nav_bar() {
 

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cartCount } = useCart();
  console.log(cartCount)





  const handleSearchClick = () => {
    router.push("/search");
  };

  const handleTrackOrderClick = () => {
    router.push("/trackorder");
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const menuItems = [
    { label: "Store", route: "/store" },
    { label: "Search", route: "/search" },
    { label: "Cart", route: "/cart" },
    { label: "Contact Us", route: "/contact" },
    { label: "FAQ", route: "/faq" },
    { label: "Refund & Returns", route: "/refund" },
    { label: "Track Order", route: "/trackorder" },
    { label: "Privacy Policy", route: "/privacy" },
    { label: "Terms & Condition", route: "/terms" },
  ];

  const handleMenuItemClick = (route: any) => {
    router.push(route);
    setIsMenuOpen(false); // Close the menu after clicking
  };

  return (
    <>
      <div className="bg-white w-full text-small text-black p-3 flex items-center justify-center">
        FREE EXPRESS SHIPPING OVER $100 USD
      </div>
      <Navbar className="bg-black text-white" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <NextImage
              onClick={handleLogoClick}
              src={SiteLogo}
              alt="Site Logo"
              width={120}
              height={40}
              priority
              className="cursor-pointer"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className="text-white hover:font-bold">
            <Link color="foreground" href="#">
              Men&apos;s
            </Link>
          </NavbarItem>
          <NavbarItem className="text-white hover:font-bold">
            <Link href="#" aria-current="page">
              Women&apos;s
            </Link>
          </NavbarItem>
          <NavbarItem className="text-white hover:font-bold">
            <Link color="foreground" href="#">
              Accessories
            </Link>
          </NavbarItem>
          <NavbarItem className="text-white hover:font-bold">
            <Link color="foreground" href="#">
              Kid&apos;s
            </Link>
          </NavbarItem>
          <NavbarItem className="text-white hover:font-bold">
            <Link color="foreground" href="#">
              FootWare
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-4">
          <Badge
            onClick={handleCartClick}
            content={cartCount} // Use the state variable here
            className="border-none"
            shape="circle"
            color="danger"
          >
            <ShoppingBag onClick={handleCartClick} className="h-5 cursor-pointer" />
          </Badge>
          <Search onClick={handleSearchClick} className="h-5 cursor-pointer" />
          <Truck onClick={handleTrackOrderClick} className="h-5 cursor-pointer" />
        </NavbarContent>

        <NavbarMenu className="bg-black text-white">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.label}-${index}`}
              className="bg-black text-white hover:bg-gray-800"
            >
              <button
                onClick={() => handleMenuItemClick(item.route)}
                className="w-full text-left py-2 px-4 text-white hover:text-gray-300"
              >
                {item.label}
              </button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
