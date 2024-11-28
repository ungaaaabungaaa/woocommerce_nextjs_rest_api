'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

import { useRouter } from "next/navigation";
import SiteLogo from "../../public/sitelogo.jpeg";
import PayPalLogo from "../../public/paypal.png";

import NextImage from "next/image";
import PromoBar from './promo-bar'
import { ScrollBasedVelocityDemo } from './ScrollBasedVelocityDemo'
import { AnimatedTestimonialsDemo } from './AnimatedTestimonialsDemo'

const footerLinks = [
  {
    title: 'Top Categories',
    links: ['Accessories', 'Footwear', 'Kids Clothing', 'Mens Clothing', 'Uncategorized', 'Womens Clothing']
  },
  {
    title: 'More Categoires',
    links: ['Running', 'Football', 'Basketball', 'Tennis', 'Outdoor']
  },
  {
    title: 'Customer Care',
    links: ['Contact', 'FAQ', 'Refunds & Returns', 'Track Orders']
  },
  {
    title: 'Explore More',
    links: ['Search Products','Sizing Charts', 'Store Locator']
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms & Condition']
  },
]

const itemClasses = {
  base: "text-white",
  title: "text-white",
  content: "text-white",
  trigger: "text-white"
};

const Footer = () => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/");
  };
  
  return (
    <>
     <PromoBar></PromoBar>
      <br></br>
      <div className="hidden md:block">
        <ScrollBasedVelocityDemo />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="hidden md:block">
          <AnimatedTestimonialsDemo />
        </div>
      </div>

    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="hidden md:flex md:flex-wrap md:-mx-4 mb-8">
          {footerLinks.map((column, index) => (
            <div key={index} className="md:w-1/6 px-4 mb-8">
              <h3 className="font-bold text-2xl mb-4">{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <Link href="#" className="hover:font-bold">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:w-1/6 px-4 mb-8">
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-white "><Facebook size={24} /></Link>
              <Link href="#" className="text-white "><Twitter size={24} /></Link>
              <Link href="#" className="text-white "><Instagram size={24} /></Link>
              <Link href="#" className="text-white "><Youtube size={24} /></Link>
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
          <Accordion
           itemClasses={itemClasses}
          >
            {footerLinks.map((column, index) => (
              <AccordionItem key={index} aria-label={column.title} title={column.title}>
                <ul>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <Link href="#" className="hover:text-gray-900">{link}</Link>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
            </Accordion>
            <Accordion
            itemClasses={itemClasses}>
            <AccordionItem key="connect" aria-label="Connect" title="Connect">
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-white"><Facebook size={24} /></Link>
                <Link href="#" className="text-white"><Twitter size={24} /></Link>
                <Link href="#" className="text-white"><Instagram size={24} /></Link>
                <Link href="#" className="text-white"><Youtube size={24} /></Link>
              </div>
              
            </AccordionItem>
            </Accordion>
          
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
          <NextImage
              onClick={handleLogoClick}
              src={SiteLogo}
              alt="Site Logo"
              width={120}
              height={40}
              priority
              className="cursor-pointer"
            />
          </div>
          <div className="flex space-x-4 text-sm">
            <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer

