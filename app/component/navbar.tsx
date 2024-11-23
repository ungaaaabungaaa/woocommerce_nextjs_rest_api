"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { useRouter } from "next/navigation"

import Link from "next/link";
import NextImage from "next/image";
import { Search, ShoppingBag, Heart, Truck } from "lucide-react"; // Assuming you're using lucide-react for icons
import SiteLogo from "../../public/sitelogo.jpeg";
import {Badge} from "@nextui-org/badge";


export default function Nav_bar() {

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSearchClick = () => {
    router.push('/search')
  };

  const handleTrackOrderClick = () => {
    router.push('/trackorder')
  };

  const handleLogoClick = () => {
    router.push('/')
  };

  const menuItems = [
    "Shop",
    "Search",
    "Cart",
    "Wishlist",
    "Contact Us",
    "FAQ",
    "Refund & Returns",
    "Track Order",
    "Privacy Policy",
    "Terms & Condition",
  ];

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
        <Search onClick={handleSearchClick} className="h-5 cursor-pointer" />
        <Badge content="99" className="border-none" shape="circle" color="danger">
         <ShoppingBag className="h-5 cursor-pointer" />
        </Badge>
        <Badge content="22" className="border-none" shape="circle" color="danger">
         <Heart className="h-5 cursor-pointer" />
        </Badge>
        <Truck onClick={handleTrackOrderClick} className="h-5 cursor-pointer" />
      </NavbarContent>

      <NavbarMenu className="bg-black text-white">
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="bg-black text-white" key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full bg-black text-white"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    </>
  );
}
