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
  Heart,
  User,
  CircleUser,
  UserCircle,
} from "lucide-react";
import { Badge } from "@nextui-org/badge";
import Sitelogo from "@/public/finallogo.svg";
import { useCart } from "../../context/cartcontext";
import { MensMegaMenu } from "@/app/component/megamenus/mens-mega-menu";
import { WomensMegaMenu } from "@/app/component/megamenus/womens-mega-menu";
import { AccessoriesMegaMenu } from "@/app/component/megamenus/accessories-mega-menu";
import { FootWearMegaMenu } from "@/app/component/megamenus/footwear-mega-menu";
import { KidsMegaMenu } from "@/app/component/megamenus/kids-mega-menu";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useWishlist } from "../../context/wishlistContext";
import { CartPopUp } from "@/app/component/popups/cartpopup";
import { AccountPopUp } from "@/app/component/popups/accountpopup";
import { WishlistPopUp } from "@/app/component/popups/wishlistpopup";
import { useHoverSupport } from "@/hooks/useHoverSupport";

export default function Nav_bar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const [visibleMegaMenu, setVisibleMegaMenu] = useState("");
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { wishlistCount } = useWishlist();
  const [visibleIconPopup, setVisibleIconPopup] = useState("");
  const supportsHover = useHoverSupport();

  useEffect(() => {
    setMounted(true);
    // Add event listener for storage changes
    const handleStorageChange = () => {
      //setWishlistItemCount(wishlistCount());
    };

    window.addEventListener("storage", handleStorageChange);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscriptions on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      unsubscribe();
    };
  }, []);

  // Update wishlist count when component mounts and after any navigation
  useEffect(() => {
    //setWishlistItemCount(wishlistCount());
  }, []); // Removed pathname dependency

  const handleSearchClick = () => {
    if (pathname === "/search") {
      router.back();
    } else {
      router.push("/search");
    }
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleWishlistClick = () => {
    router.push("/wishlist");
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
    { name: "Comfort", component: MensMegaMenu },
    { name: "EveryDay", component: AccessoriesMegaMenu },
  ];

  const handleIconMouseEnter = (popup: string) => {
    if (supportsHover) {
      setVisibleIconPopup(popup);
    }
  };

  const handleIconMouseLeave = () => {
    if (supportsHover) {
      setVisibleIconPopup("");
    }
  };

  return (
    <>
      <div className="w-full py-2 flex align-middle items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        <Navbar
          maxWidth="full"
          className="bg-white text-black dark:bg-black dark:text-white h-8 w-full  max-w-7xl "
        >
          <NavbarContent className="sm:flex gap-4" justify="start">
            <NavbarBrand className="pr-4 hidden sm:flex">
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-3 w-3" />
                <span className="text-xs">theclothvillagestore.com</span>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="flex absolute left-1/2 transform -translate-x-1/2"
            justify="center"
          >
            <p className="text-xs font-medium">Official Cloth Village Store</p>
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
      </div>
      <div className="sticky top-0 z-50">
        <div className="relative">
          <div className="w-full py-3 flex align-middle items-center justify-center  text-white  dark:text-black border-b border-gray-700 dark:border-gray-200 bg-black dark:bg-white">
            <Navbar
              maxWidth="full"
              className="text-white dark:text-black  bg-black dark:bg-white max-w-7xl"
              onMenuOpenChange={setIsMenuOpen}
            >
              <NavbarContent
                className="sm:flex gap-4 bg-black dark:bg-white"
                justify="start"
              >
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
                />
                <NavbarBrand>
                  <NextImage
                    onClick={handleLogoClick}
                    src={Sitelogo}
                    alt="Site Logo"
                    width={180}
                    height={100}
                    priority
                    className="cursor-pointer"
                  />
                </NavbarBrand>

                <NavbarContent
                  className="hidden sm:flex gap-10"
                  justify="start"
                >
                  {megaMenus.map((menu) => (
                    <NavbarItem
                      key={menu.name}
                      className="text-white hover:font-bold dark:text-black "
                      onMouseEnter={() =>
                        supportsHover && setVisibleMegaMenu(menu.name)
                      }
                      // onMouseLeave={() => supportsHover && setVisibleMegaMenu("")}
                    >
                      <Link href="#">{menu.name}&apos;s</Link>
                    </NavbarItem>
                  ))}
                </NavbarContent>
              </NavbarContent>

              <NavbarContent justify="end" className="gap-4">
                <Search
                  onClick={handleSearchClick}
                  className="h-8 cursor-pointer text-white dark:text-black"
                />

                {isAuthenticated ? (
                  <div
                    className={supportsHover ? "hover-enabled" : ""}
                    onMouseEnter={() => handleIconMouseEnter("account")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <UserCircle
                      className="h-8 cursor-pointer text-white dark:text-black"
                      onClick={() => router.push("/auth/user")}
                    />
                  </div>
                ) : (
                  <div
                    className={supportsHover ? "hover-enabled" : ""}
                    onMouseEnter={() => handleIconMouseEnter("account")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <User
                      className="h-8 cursor-pointer text-white dark:text-black"
                      onClick={() => router.push("/auth/register")}
                    />
                  </div>
                )}

                <Badge
                  content={wishlistCount}
                  className="border-none"
                  shape="circle"
                  color="danger"
                >
                  <div
                    className={supportsHover ? "hover-enabled" : ""}
                    onMouseEnter={() => handleIconMouseEnter("wishlist")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <Heart
                      onClick={handleWishlistClick}
                      className="h-8 cursor-pointer text-white dark:text-black"
                    />
                  </div>
                </Badge>

                <Badge
                  content={cartCount}
                  className="border-none"
                  shape="circle"
                  color="danger"
                >
                  <div
                    className={supportsHover ? "hover-enabled" : ""}
                    onMouseEnter={() => handleIconMouseEnter("cart")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <ShoppingBag
                      onClick={handleCartClick}
                      className="h-8 cursor-pointer text-white dark:text-black"
                    />
                  </div>
                </Badge>

                {mounted && (
                  <button onClick={toggleTheme} className="focus:outline-none">
                    {theme === "dark" ? (
                      <Sun className="h-8 cursor-pointer text-white dark:text-black" />
                    ) : (
                      <Moon className="h-8 cursor-pointer text-white dark:text-black" />
                    )}
                  </button>
                )}
              </NavbarContent>

              <NavbarMenu className=" bg-black dark:bg-white dark:text-black text-white flex align-middle items-start justify-center text-start">
                {menuItems.map((item, index) => (
                  <NavbarMenuItem
                    key={`${item.label}-${index}`}
                    className=""
                  >
                    <button
                      onClick={() => handleMenuItemClick(item.route)}
                      className="w-full text-left py-2 px-4 text-white hover:text-gray-300 dark:text-black text-lg"
                    >
                      {item.label}
                    </button>
                  </NavbarMenuItem>
                ))}
              </NavbarMenu>
            </Navbar>
          </div>

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
                onMouseEnter={() =>
                  supportsHover && setVisibleMegaMenu(menu.name)
                }
                onMouseLeave={() => supportsHover && setVisibleMegaMenu("")}
              >
                <menu.component />
              </div>
            ))}
          </div>
          {/* Icon Popups Container */}
          <div className="absolute left-0 w-full">
            <div
              className={`absolute top-full left-0 w-full transition-all duration-300 ${
                visibleIconPopup === "cart"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible pointer-events-none"
              }`}
              onMouseEnter={() => handleIconMouseEnter("cart")}
              onMouseLeave={handleIconMouseLeave}
            >
              <CartPopUp />
            </div>
            <div
              className={`absolute top-full left-0 w-full transition-all duration-300 ${
                visibleIconPopup === "account"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible pointer-events-none"
              }`}
              onMouseEnter={() => handleIconMouseEnter("account")}
              onMouseLeave={handleIconMouseLeave}
            >
              <AccountPopUp />
            </div>
            <div
              className={`absolute top-full left-0 w-full transition-all duration-300 ${
                visibleIconPopup === "wishlist"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible pointer-events-none"
              }`}
              onMouseEnter={() => handleIconMouseEnter("wishlist")}
              onMouseLeave={handleIconMouseLeave}
            >
              <WishlistPopUp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
