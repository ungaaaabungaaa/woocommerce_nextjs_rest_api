"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import SiteLogo from "../../public/sitelogo.jpeg";
import PayPalLogo from "../../public/paypal.png";
import NextImage from "next/image";
import PromoBar from "./promo-bar";
import { ScrollBasedVelocityDemo } from "./ScrollBasedVelocityDemo";
import { useTheme } from "next-themes";
import SiteLogoDark from "../../public/sitelogodark.jpg";

const footerLinks = [
  {
    title: "Top Categories",
    links: [
      { name: "Accessories", url: "/store/accessories" },
      { name: "Footwear", url: "/store/footwear" },
      { name: "Kids Clothing", url: "/store/kids-clothing" },
      { name: "Mens Clothing", url: "/store/mens-clothing" },
      { name: "Uncategorized", url: "/store/uncategorized" },
      { name: "Womens Clothing", url: "/store/womens-clothing" },
    ],
  },
  {
    title: "More Categories",
    links: [
      { name: "Running", url: "/store/running" },
      { name: "Football", url: "/store/football" },
      { name: "Basketball", url: "/store/basketball" },
      { name: "Tennis", url: "/store/tennis" },
      { name: "Outdoor", url: "/store/outdoor" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { name: "Contact", url: "/contact" },
      { name: "FAQ", url: "/faq" },
      { name: "Refunds & Returns", url: "/refund" },
      { name: "Track Orders", url: "/trackorder" },
    ],
  },
  {
    title: "Explore More",
    links: [
      { name: "Search Products", url: "/search" },
      { name: "Sizing Charts", url: "/sizechart" },
      { name: "Store Locator", url: "/storelocator" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", url: "/privacy" },
      { name: "Terms & Condition", url: "/terms" },
    ],
  },
];

const Footer = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  // Define mounted state
  const [mounted, setMounted] = useState(false);

  // Ensure mounted is set to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = () => {
    router.push("/");
  };

  // Define itemClasses based on the current theme
  const itemClasses =
    theme === "dark"
      ? {
          base: "text-black",
          title: "text-black",
          content: "text-black",
          trigger: "text-black",
        }
      : {
          base: "text-white",
          title: "text-white",
          content: "text-white",
          trigger: "text-white",
        };

  return (
    <>
      <PromoBar></PromoBar>
      <br></br>
      <div className="hidden md:block bg-black dark:bg-white">
        <ScrollBasedVelocityDemo />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <footer className="bg-black text-white dark:bg-white dark:text-black">
        <div className="container mx-auto px-4 py-8">
          <div className="hidden md:flex md:flex-wrap md:-mx-4 mb-8">
            {footerLinks.map((column, index) => (
              <div key={index} className="md:w-1/6 px-4 mb-8">
                <h3 className="font-bold text-md mb-4">{column.title}</h3>
                <ul>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <Link href={link.url} className="hover:font-bold">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="md:w-1/6 px-4 mb-8">
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-white dark:text-black ">
                  <Facebook size={24} />
                </Link>
                <Link href="#" className="text-white dark:text-black ">
                  <Twitter size={24} />
                </Link>
                <Link href="#" className="text-white dark:text-black ">
                  <Instagram size={24} />
                </Link>
                <Link href="#" className="text-white dark:text-black ">
                  <Youtube size={24} />
                </Link>
              </div>
              <div className=" space-x-2">
                <h3 className="font-bold mb-4">Secure Payment Methos</h3>
                <NextImage
                  src={PayPalLogo}
                  alt="Site Logo"
                  width={40}
                  height={40}
                  priority
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Accordion itemClasses={itemClasses}>
              {footerLinks.map((column, index) => (
                <AccordionItem
                  key={index}
                  aria-label={column.title}
                  title={column.title}
                >
                  <ul>
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="mb-2">
                        <Link href={link.url} className="hover:text-gray-900">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
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
                // Optional: A placeholder to avoid layout shift
                <div
                  style={{ width: 120, height: 40 }}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div className="flex space-x-4 text-sm">
              <Link href="/terms" className="">
                Terms of Service
              </Link>
              <Link href="/privacy" className="">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
