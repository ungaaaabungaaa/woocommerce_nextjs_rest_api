"use client";
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
import {
  Search,
  ShoppingBag,
  Truck,
  Moon,
  Sun,
  ChevronLeft,
} from "lucide-react";
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
    setTheme(theme === "dark" ? "light" : "dark");
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

  const megaMenus = [
    { name: "Men", component: MensMegaMenu },
    { name: "Women", component: WomensMegaMenu },
    { name: "Accessories", component: AccessoriesMegaMenu },
    { name: "Kids", component: KidsMegaMenu },
    { name: "Footwear", component: FootWearMegaMenu },
  ];

  return (
    <div className="sticky top-0 z-50">
      <div className="relative">
        <Navbar
          maxWidth="xl"
          className="bg-white text-black dark:bg-black dark:text-white h-10"
        >
          <NavbarContent className="sm:flex gap-4" justify="start">
            <NavbarBrand className="pr-4 hidden sm:flex">
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-3 w-3" />
                <span className="text-xs">StudioUniversal.com</span>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="flex absolute left-1/2 transform -translate-x-1/2"
            justify="center"
          >
            <p className="text-xs font-medium">
              Official Universal Studio Store
            </p>
          </NavbarContent>

          <NavbarContent justify="end" className="gap-4">
            <nav className="hidden gap-4 md:flex">
              <Link
                href="/contact"
                className="text-xs text-muted-foreground hover:font-bold cursor-pointer"
              >
                Help
              </Link>
              <Link
                href="/trackorder"
                className="text-xs text-muted-foreground hover:font-bold cursor-pointer"
              >
                Orders & Returns
              </Link>
            </nav>
          </NavbarContent>
        </Navbar>

        <Navbar
          maxWidth="xl"
          className="bg-black text-white dark:bg-white dark:text-black"
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent className="sm:flex gap-4" justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand className="pr-4">
              {mounted && theme === "dark" ? (
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
                <div
                  style={{ width: 120, height: 40 }}
                  className="cursor-pointer"
                />
              )}
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-8" justify="start">
              {megaMenus.map((menu) => (
                <NavbarItem
                  key={menu.name}
                  className="text-white hover:font-bold dark:text-black"
                  onMouseEnter={() => setVisibleMegaMenu(menu.name)}
                  // onMouseLeave={() => setVisibleMegaMenu("")}
                >
                  <Link href="#">{menu.name}&apos;s</Link>
                </NavbarItem>
              ))}
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
              <ShoppingBag
                onClick={handleCartClick}
                className="h-5 cursor-pointer text-white dark:text-black"
              />
            </Badge>
            {mounted && (
              <button onClick={toggleTheme} className="focus:outline-none">
                {theme === "dark" ? (
                  <Sun className="h-5 cursor-pointer text-white dark:text-black" />
                ) : (
                  <Moon className="h-5 cursor-pointer text-white dark:text-black" />
                )}
              </button>
            )}
            <Search
              onClick={handleSearchClick}
              className="h-5 cursor-pointer text-white dark:text-black"
            />
            <Truck
              onClick={handleTrackOrderClick}
              className="h-5 cursor-pointer text-white dark:text-black"
            />
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

        {/* Mega Menus Container */}
        <div className="absolute left-0 w-full">
          {megaMenus.map((menu) => (
            <div
              key={menu.name}
              className={`absolute top-0 left-0 w-full transition-all duration-300 ${
                visibleMegaMenu === menu.name
                  ? "opacity-100 visible"
                  : "opacity-0 invisible pointer-events-none"
              }`}
              onMouseEnter={() => setVisibleMegaMenu(menu.name)}
              onMouseLeave={() => setVisibleMegaMenu("")}
            >
              <menu.component />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
