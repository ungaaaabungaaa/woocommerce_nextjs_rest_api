'use client'
import React, { useState, useEffect } from "react";
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
import { Search, ShoppingBag, Truck, Moon, Sun, ChevronLeft } from 'lucide-react';
import { Badge } from "@nextui-org/badge";
import SiteLogo from "../../public/sitelogo.jpeg";
import SiteLogoDark from "../../public/sitelogodark.jpg";
import { useCart } from "../../context/cartcontext";
import { MensMegaMenu } from "./mens-mega-menu";
import { WomensMegaMenu } from "./womens-mega-menu";
import { AccessoriesMegaMenu } from "./accessories-mega-menu";
import { FootWearMegaMenu } from "./footwear-mega-menu";
import { KidsMegaMenu } from "./kids-mega-menu";
import { useTheme } from "next-themes";
import { SiteHeader } from "./site-header";
import { usePathname } from "next/navigation";

export default function Nav_bar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const [visibleMegaMenu, setVisibleMegaMenu] = useState("");
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchClick = () => {
    if (pathname === "/search") {
      router.back(); 
    } else {
      router.push("/search");
    }
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
    setIsMenuOpen(false);
  };

  return (
    <>
  

    <Navbar maxWidth="xl" className="bg-white text-black dark:bg-black dark:text-white h-10">
      <NavbarContent className="sm:flex gap-4" justify="start">
        <NavbarBrand className="pr-4 hidden sm:flex">
          <div className="flex items-center gap-2">
            <ChevronLeft className="h-3 w-3" />
            <span className="text-xs">StudioUniversal.com</span>
          </div>              
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex absolute left-1/2 transform -translate-x-1/2" justify="center">
        <p className="text-xs font-medium">Official Universal Studio Store</p>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <nav className="hidden gap-4 md:flex">
          <Link 
            href="/contact" 
            className="text-xs text-muted-foreground  hover:font-bold cursor-pointer"
          >
            Help
          </Link>
          <Link 
            href="/trackorder" 
            className="text-xs text-muted-foreground  hover:font-bold cursor-pointer"
          >
            Orders & Returns
          </Link>
        </nav>            
      </NavbarContent>
    </Navbar>



























      
      <Navbar maxWidth="xl" className="bg-black text-white dark:bg-white dark:text-black" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="sm:flex gap-4" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="pr-4">
            
            {mounted && theme === 'dark' ? (
              <NextImage
                onClick={handleLogoClick}
                src={SiteLogoDark}
                alt="Site Logo"
                width={120}
                height={40}
                priority
                className="cursor-pointer"
              />
            ) : mounted ? (
              <NextImage
                onClick={handleLogoClick}
                src={SiteLogo}
                alt="Site Logo"
                width={120}
                height={40}
                priority
                className="cursor-pointer"
              />
            ) : (
              // Optional: A placeholder to avoid layout shift
              <div style={{ width: 120, height: 40 }} className="cursor-pointer" />
            )}


          </NavbarBrand>
          
          <NavbarContent className="hidden sm:flex gap-8" justify="start">
            <NavbarItem
              className="text-white hover:font-bold dark:text-black"
              onMouseEnter={() => setVisibleMegaMenu("Men")}
              onClick={() => setVisibleMegaMenu("")}
            >
              <Link href="#">Men&apos;s</Link>
            </NavbarItem>
            <NavbarItem
              className="text-white hover:font-bold dark:text-black"
              onMouseEnter={() => setVisibleMegaMenu("Women")}
              onClick={() => setVisibleMegaMenu("")}
            >
              <Link href="#">Women&apos;s</Link>
            </NavbarItem>
            <NavbarItem
              className="text-white hover:font-bold dark:text-black"
              onMouseEnter={() => setVisibleMegaMenu("Accessories")}
              onClick={() => setVisibleMegaMenu("")}
            >
              <Link href="#">Accessories</Link>
            </NavbarItem>
            <NavbarItem
              className="text-white hover:font-bold dark:text-black"
              onMouseEnter={() => setVisibleMegaMenu("Kids")}
              onClick={() => setVisibleMegaMenu("")}
            >
              <Link href="#">Kid&apos;s</Link>
            </NavbarItem>
            <NavbarItem
              className="text-white hover:font-bold dark:text-black"
              onMouseEnter={() => setVisibleMegaMenu("Footwear")}
              onClick={() => setVisibleMegaMenu("")}
            >
              <Link href="#">Footwear</Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-4">
          <Badge
            onClick={handleCartClick}
            content={cartCount}
            className="border-none"
            shape="circle"
            color="danger"
          >
            <ShoppingBag onClick={handleCartClick} className="h-5 cursor-pointer text-white dark:text-black" />
          </Badge>
          {mounted && (
            <button onClick={toggleTheme} className="focus:outline-none">
              {theme === 'dark' ? (
                <Sun className="h-5 cursor-pointer text-white dark:text-black " />
              ) : (
                <Moon className="h-5 cursor-pointer text-white dark:text-black" />
              )}
            </button>
          )}
          <Search onClick={handleSearchClick} className="h-5 cursor-pointer text-white dark:text-black" />
          <Truck onClick={handleTrackOrderClick} className="h-5 cursor-pointer text-white dark:text-black" />
        </NavbarContent>

        <NavbarMenu className="bg-black text-white dark:bg-white dark:text-white">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.label}-${index}`}
              className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
            >
              <button
                onClick={() => handleMenuItemClick(item.route)}
                className="w-full text-left py-2 px-4 text-white hover:text-gray-300 dark:text-black"
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
          className="mega-menu"
        >
          <MensMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Women" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Women")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 shadow-lg bg-black dark:bg-white z-50"
        >
          <WomensMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Accessories" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Accessories")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 shadow-lg bg-black dark:bg-white z-50"
        >
          <AccessoriesMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Kids" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Kids")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 shadow-lg bg-black dark:bg-white z-50"
        >
          <KidsMegaMenu />
        </div>
      )}
      {visibleMegaMenu === "Footwear" && (
        <div
          onMouseEnter={() => setVisibleMegaMenu("Footwear")}
          onMouseLeave={() => setVisibleMegaMenu("")}
          className="mega-menu sticky top-16 shadow-lg bg-black dark:bg-white z-50"
        >
          <FootWearMegaMenu />
        </div>
      )}
    </>
  );
}