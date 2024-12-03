"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

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
}

interface Product {
  id: number
  name: string
  type: string
  description: string
  short_description: string
  price: string
  images: Array<{ src: string; alt: string }>
  attributes: Array<{ name: string; options: string[] }>
  variations: number[]
  stock_status: string
}

const ProductPage: React.FC<{ params: { product: string } }> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [variations, setVariations] = useState<Variation[]>([])
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null)
  const [quantity, setQuantity] = useState(1)

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          {product.images && product.images.length > 0 && (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
            />
          )}
        </div>
        <div className="order-1 md:order-2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">
            ${selectedVariation ? selectedVariation.price : product.price}
          </p>
          <p className="mb-4">
            {selectedVariation
              ? selectedVariation.stock_status === 'instock'
                ? 'In Stock'
                : 'Out of Stock'
              : product.stock_status === 'instock'
              ? 'In Stock'
              : 'Out of Stock'}
          </p>
          <div
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
          {product.type === 'variable' && product.attributes && (
            <div className="mb-6">
              {product.attributes.map((attr) => (
                <div key={attr.name} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {attr.name}
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    onChange={(e) => handleVariationChange(attr.name, e.target.value)}
                  >
                    {attr.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  )
}

export default ProductPage