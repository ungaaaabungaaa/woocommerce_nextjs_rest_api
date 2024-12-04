'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Badge } from '@nextui-org/badge'
import {Chip} from "@nextui-org/chip";
import {Accordion, AccordionItem} from "@nextui-org/accordion";



interface Attribute {
  id: number
  name: string
  slug: string
  option: string
}

interface Variation {
  id: number
  attributes: Attribute[]
  price: string
  image: {
    src: string
    alt: string
  }
  stock_status: string
  sku: string
}

interface Category {
  id: number
  name: string
  slug: string
}

interface Product {
  id: number
  name: string
  type: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  images: Array<{ src: string; alt: string }>
  attributes: Array<{ name: string; options: string[] }>
  variations: number[]
  stock_status: string
  categories: Category[]
  average_rating: string
  rating_count: number
  date_created: string
  sku: string
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
}

const ProductPage: React.FC<{ params: { product: string } }> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [variations, setVariations] = useState<Variation[]>([])
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    // Fetch product data
    fetch(`/api/getproductdetails?id=${params.product}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        if (data.type === 'variable') {
          // Fetch variations data
          fetch(`/api/getproductvariations?id=${params.product}`)
            .then((res) => res.json())
            .then((variationsData) => {
              setVariations(variationsData)
              setSelectedVariation(variationsData[0])
            })
        }
      })
  }, [params.product])

  const handleVariationChange = (attributeName: string, option: string) => {
    const newVariation = variations.find((v) =>
      v.attributes.some((attr) => attr.name === attributeName && attr.option === option)
    )
    setSelectedVariation(newVariation || null)
  }

  const handleAddToCart = () => {
    if (product?.type === 'simple') {
      console.log('Added to cart:', { id: product.id, quantity })
    } else if (selectedVariation) {
      console.log('Added to cart:', { id: selectedVariation.id, quantity })
    }
  }

  if (!product) return <div>Loading...</div>

  const itemClasses = {
    base: "text-white",
    title: "text-white",
    content: "text-white",
    trigger: "text-white"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[activeImageIndex].src}
              alt={product.images[activeImageIndex].alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md ${
                  index === activeImageIndex ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: product.short_description}} />
           
            <br></br>
            <Chip size="lg">{product.stock_status}</Chip>
            <br></br>
            <br></br>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
           
          </div>
          <div className="flex items-center space-x-2">

            <h1 className="text-2xl font-bold">Price : </h1>

            {product.on_sale && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.regular_price}
              </span>
            )}

            <span className="text-2xl font-bold">
              ${selectedVariation ? selectedVariation.price : product.price}
            </span>
          </div>
          
          {product.type === 'variable' && product.attributes && (
            <div className="space-y-4">
              {product.attributes.map((attr) => (
                <div key={attr.name}>
                  <label className="block text-sm font-medium mb-2">
                    {attr.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {attr.options.map((option) => (
                      <Button
                        className='text-white bg-black hover:bg-white hover:text-black'
                        key={option}
                        onClick={() => handleVariationChange(attr.name, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-4">
         

            <div className="flex items-center bg-white rounded-full border border-white overflow-hidden">
                  <Button
                    size="lg"
                    className="bg-white rounded-full p-4 h-12 w-8 flex items-center justify-center"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-3 text-sm text-black">
                    {quantity}
                  </span>
                  <Button
                    size="lg"
                    className="bg-white rounded-full p-4 h-12 w-8 flex items-center justify-center"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
            </div>


            <Button onClick={handleAddToCart} className="flex-1 bg-white rounded-full h-12 flex items-center justify-center">
              <ShoppingCart className="mr-2 h-12 w-4" /> Add to Cart
            </Button>
          </div>
          <div className="flex space-x-4">
          <Accordion
          itemClasses={itemClasses}
          >
            <AccordionItem  subtitle="Product Dimensions"  key="1" aria-label="ABOUT" title="ABOUT">
            <p>
              <strong>Weight:</strong> {product.weight || 'Not specified'} kg
            </p>
            <p>
              <strong>Dimensions:</strong> 
              {product.dimensions.length && product.dimensions.width && product.dimensions.height ? (
                `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height} cm`
              ) : (
                'Not specified'
              )}
            </p>    
            </AccordionItem>
            <AccordionItem key="2" subtitle="Please size down if you are between sizes" aria-label="SIZE GUIDE" title="SIZE GUIDE">
             
            </AccordionItem>
            <AccordionItem key="3" subtitle="Free Shipping on all orders over $100 USD" aria-label="SHIPPING" title="SHIPPING">
              
            </AccordionItem>
          </Accordion>
          </div>
        
        </div>
      </div>
      
    </div>
  )
}

export default ProductPage

