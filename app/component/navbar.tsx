"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, ShoppingBag, Search, User } from 'lucide-react'
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const handleCategoryHover = (category: string) => {
    setActiveCategory(category)
  }

  const handleCategoryLeave = () => {
    setActiveCategory(null)
  }

  return (
    <nav className="bg-black text-white">
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
                  <Button className="text-white bg-black">
                    {category.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Button className="bg-black">
              <Search className="h-5 w-5 text-white" />
              <span className="sr-only">Search</span>
            </Button>
            <Button className="bg-black">
              <ShoppingBag className="h-5 w-5 text-white" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-black text-white">
                <div className="flex flex-col space-y-4 py-4">
                  <Button variant="ghost" className="self-end" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <h2 className="text-lg font-semibold">{category.name}</h2>
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                          className="block py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subcategory}
                        </Link>
                      ))}
                      <div className="grid grid-cols-2 gap-4 pt-4">
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
                  <div className="space-y-2">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="bg-white text-black"
                    />
                    <Button className="w-full justify-start">
                      <User className="mr-2 h-5 w-5" />
                      Account
                    </Button>
                    <Button className="w-full justify-start">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Cart
                    </Button>
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
                      <Link href={`/${activeCategory.toLowerCase()}/${subcategory.toLowerCase()}`} className="hover:underline">
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
                    <Button>Shop Now</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}