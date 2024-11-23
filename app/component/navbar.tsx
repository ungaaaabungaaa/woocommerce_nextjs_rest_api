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


export default function Nav_bar() {

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSearchClick = () => {
    router.push('/search')
  };

  const handleTrackOrderClick = () => {
    router.push('/trackorder')
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
    <Navbar className="bg-black text-white" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NextImage
            src={SiteLogo}
            alt="Site Logo"
            width={120}
            height={40}
            priority
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="text-gray-400 hover:text-white">
          <Link color="foreground" href="#">
            Men's
          </Link>
        </NavbarItem>
        <NavbarItem className="text-gray-400 hover:text-white">
          <Link href="#" aria-current="page">
            Women's
          </Link>
        </NavbarItem>
        <NavbarItem className="text-gray-400 hover:text-white">
          <Link color="foreground" href="#">
            Accessories
          </Link>
        </NavbarItem>
        <NavbarItem className="text-gray-400 hover:text-white">
          <Link color="foreground" href="#">
            Kid's
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <Search onClick={handleSearchClick} className="h-5 cursor-pointer" />
        <ShoppingBag className="h-5 cursor-pointer" />
        <Heart className="h-5 cursor-pointer" />
        <Truck onClick={handleTrackOrderClick} className="h-5 cursor-pointer" />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
