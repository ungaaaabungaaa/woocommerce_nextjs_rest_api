"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, ShoppingBag, Search, User, Heart , Truck} from 'lucide-react'
import { Button } from "@nextui-org/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useRouter } from "next/navigation"

const categories = [
  {
    name: "Women",
    subcategories: ["Dresses", "Tops", "Bottoms", "Accessories"],
    featured: [
      { name: "New Arrivals", image: "https://images.unsplash.com/photo-1718784562407-3f7b1b88e08b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww" },
      { name: "Summer Collection", image: "https://images.unsplash.com/photo-1718784562407-3f7b1b88e08b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww" },
    ],
  },
  {
    name: "Men",
    subcategories: ["Shirts", "Pants", "Suits", "Accessories"],
    featured: [
      { name: "Casual Wear", image: "https://images.unsplash.com/photo-1609195994377-dbffba3a4eb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D" },
      { name: "Business Attire", image: "https://images.unsplash.com/photo-1609195994377-dbffba3a4eb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D" },
    ],
  },
  {
    name: "Kids",
    subcategories: ["Girls", "Boys", "Babies", "Accessories"],
    featured: [
      { name: "Back to School", image: "https://images.unsplash.com/photo-1534880786429-7cb3199b7b0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2lkcyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D" },
      { name: "Playtime Favorites", image: "https://images.unsplash.com/photo-1534880786429-7cb3199b7b0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2lkcyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D" },
    ],
  },
]

export default function Component() {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
  
  const handleCategoryHover = (category: string) => {
    setActiveCategory(category)
  }

  const handleCategoryLeave = () => {
    setActiveCategory(null)
  }

  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/search')
  }

  const handleTrackOrderClick = () => {
    router.push('/trackorder')
  }

  return (
    <>
      <div className="bg-white w-full text-small text-black p-3 flex items-center justify-center">
        FREE EXPRESS SHIPPING OVER $100 USD
      </div>
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                Studio Universal
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center space-x-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="relative"
                    onMouseEnter={() => handleCategoryHover(category.name)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <Button  className="text-white bg-black">
                      {category.name} <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
                <Search onClick={handleSearchClick} className="h-5 cursor-pointer" />
                <ShoppingBag className="h-5 cursor-pointer" />
                <Heart className="h-5 cursor-pointer" />
                <Truck onClick={handleTrackOrderClick} className="h-5 cursor-pointer" />
            </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button  className="text-white bg-black p-0 hover:bg-transparent">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full p-0 [&_.close-button]:hidden">
                  <div className="flex flex-col h-full bg-black text-white">
                    <div className="flex-1 overflow-y-auto px-4 py-2">
                      {categories.map((category) => (
                        <div key={category.name} className="mb-6">
                          <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              href={`/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                              className="block py-1 text-gray-300 hover:text-white"
                            >
                              {subcategory}
                            </Link>
                          ))}
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="space-y-2">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={150}
                                  height={100}
                                  className="rounded-md"
                                />
                                <p className="text-sm font-medium">{item.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {activeCategory && (
          <div
            className="absolute left-0 w-full bg-black text-white shadow-lg z-[999]"
            onMouseEnter={() => handleCategoryHover(activeCategory)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-4">{activeCategory}</h3>
                  <ul className="space-y-2">
                    {categories.find(cat => cat.name === activeCategory)?.subcategories.map((subcategory) => (
                      <li key={subcategory}>
                        <Link href={`/${activeCategory.toLowerCase()}/${subcategory.toLowerCase()}`} className="hover:text-gray-300">
                          {subcategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-8">
                  {categories.find(cat => cat.name === activeCategory)?.featured.map((item) => (
                    <div key={item.name} className="space-y-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="rounded-md"
                      />
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-300">
                        Discover our latest {item.name.toLowerCase()} collection, featuring trendy styles for every occasion.
                      </p>
                      <Button className="text-black bg-white">Shop Now</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}