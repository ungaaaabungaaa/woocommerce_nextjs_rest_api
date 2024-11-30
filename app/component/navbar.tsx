'use client'
import React, { useState } from "react";
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
import { Search, ShoppingBag, Truck, Instagram } from "lucide-react";
import { Badge } from "@nextui-org/badge";
import SiteLogo from "../../public/sitelogo.jpeg";
import { useCart } from "../../context/cartcontext";
import { MensMegaMenu } from "./mens-mega-menu";
import { WomensMegaMenu } from "./womens-mega-menu";
import { AccessoriesMegaMenu } from "./accessories-mega-menu";
import { FootWearMegaMenu } from "./footwear-mega-menu";
import { KidsMegaMenu } from "./kids-mega-menu";

export default function Nav_bar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const [visibleMegaMenu, setVisibleMegaMenu] = useState("");

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

  const handleMenuItemClick = (route:any) => {
    router.push(route);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="bg-white w-full text-small text-black p-3 flex items-center justify-center">
        BLACK FRIDAY SALE!
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
          <NavbarItem
            className="text-white hover:font-bold"
            onMouseEnter={() => setVisibleMegaMenu("Men")}
            onClick={() => setVisibleMegaMenu("")}
          >
            <Link href="#">Men&apos;s</Link>
          </NavbarItem>
          <NavbarItem
            className="text-white hover:font-bold"
            onMouseEnter={() => setVisibleMegaMenu("Women")}
            onClick={() => setVisibleMegaMenu("")}
          >
            <Link href="#">Women&apos;s</Link>
          </NavbarItem>
          <NavbarItem
            className="text-white hover:font-bold"
            onMouseEnter={() => setVisibleMegaMenu("Accessories")}
            onClick={() => setVisibleMegaMenu("")}
          >
            <Link href="#">Accessories</Link>
          </NavbarItem>
          <NavbarItem
            className="text-white hover:font-bold"
            onMouseEnter={() => setVisibleMegaMenu("Kids")}
            onClick={() => setVisibleMegaMenu("")}
          >
            <Link href="#">Kid&apos;s</Link>
          </NavbarItem>
          <NavbarItem
            className="text-white hover:font-bold"
            onMouseEnter={() => setVisibleMegaMenu("Footwear")}
            onClick={() => setVisibleMegaMenu("")}
          >
            <Link href="#">Footwear</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-4">
          <Badge
            onClick={handleCartClick}
            content={cartCount}
            className="border-none"
            shape="circle"
            color="danger"
          >
            <ShoppingBag className="h-5 cursor-pointer" />
          </Badge>
          <Instagram className="h-5 cursor-pointer" />
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

      {/* Render mega menus based on the visibleMegaMenu state */}
      {visibleMegaMenu === "Men" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Men")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 bg-white shadow-lg z-50"
        >
          <MensMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Women" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Women")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 bg-white shadow-lg z-50"
        >
          <WomensMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Accessories" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Accessories")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 bg-white shadow-lg z-50"
        >
          <AccessoriesMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Kids" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Kids")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 bg-white shadow-lg z-50"
        >
          <KidsMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Footwear" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Footwear")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 bg-white shadow-lg z-50"
        >
          <FootWearMegaMenu />
        </div>
      )}
    </>
  );
}
