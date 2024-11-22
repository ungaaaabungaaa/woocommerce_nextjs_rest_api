'use client'

import Image from "next/image"
import Link from "next/link"
import {Badge} from "@nextui-org/badge";

import { Button } from "@nextui-org/button"
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  image: string
  hoverimage: string
  isNew?: boolean
  price: string
  slug: string
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white bg-black">
          {products.map((product) => (
            <Card key={product.id} className="group relative bg-card border-muted">
          
                
              <CardHeader className="line-clamp-1 text-2xl text-white">
                {product.title}
              </CardHeader>
             
              <CardBody>
                <div className="aspect-square relative overflow-hidden rounded-lg bg-muted group">
                  {/* Primary Image */}
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {/* Hover Image */}
                  <Image
                    src={product.hoverimage}
                    alt={`${product.title} hover`}
                    fill
                    className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
                <p className="text-sm text-white mt-2">
                  {product.description}
                </p>
              </CardBody>

              <CardFooter className="grid grid-cols-2 gap-2">
                <Button 
                  size="md"
                  className="w-full bg-black text-white"
                  onClick={() => {
                    // view product logic here
                    console.log('View Product:', product.id)
                  }}
                >
                 View Product
                </Button>
                <Button 
                  size="md"
                  className="w-full bg-white text-black"
                  onClick={() => {
                    // Add to cart logic here
                    console.log('Added to cart:', product.id)
                  }}
                >

                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

