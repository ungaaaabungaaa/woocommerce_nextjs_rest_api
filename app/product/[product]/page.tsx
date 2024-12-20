'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Chip } from "@nextui-org/chip"
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import axios from 'axios';
import { useCartKey } from '../../../hooks/useCartKey';
import { useCart } from '../../../context/cartcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "next-themes";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";

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
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { cartKey, loading, error: cartKeyError } = useCartKey();
  const { fetchCartDetails } = useCart();
  const { theme, setTheme } = useTheme(); // Access current theme and theme setter


   const itemClasses = theme === 'dark'
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
  

  useEffect(() => {
    // Fetch product data
    fetch(`/api/getproductdetails?id=${params.product}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data)
        if (data.type === 'variable') {
          // Fetch variations data
          fetch(`/api/getproductvariations?id=${params.product}`)
            .then((res) => res.json())
            .then((variationsData: Variation[]) => {
              setVariations(variationsData)
              
              // Initialize selected options
              const initialOptions: Record<string, string> = {}
              data.attributes.forEach(attr => {
                const availableOption = variationsData.find(v => 
                  v.attributes.some(a => a.name === attr.name)
                )?.attributes.find(a => a.name === attr.name)?.option
                if (availableOption) {
                  initialOptions[attr.name] = availableOption
                }
              })
              setSelectedOptions(initialOptions)

              // Select the first variation that matches all initial attributes
              const initialVariation = variationsData.find((variation) => 
                variation.attributes.every(attr => 
                  initialOptions[attr.name] === attr.option
                )
              )
              
              setSelectedVariation(initialVariation || null)
            })
        }
      })
  }, [params.product])

  const handleVariationChange = (attributeName: string, option: string) => {
    // Update selected options
    const updatedSelectedOptions = {
      ...selectedOptions,
      [attributeName]: option,
    }
    setSelectedOptions(updatedSelectedOptions)
  
    // Find a variation that matches ALL selected attributes
    const newVariation = variations.find((variation) =>
      variation.attributes.every((attr) =>
        updatedSelectedOptions[attr.name] === attr.option
      )
    )
  
    setSelectedVariation(newVariation || null)
  }

  const handleAddToCart = () => {
    if (product?.type === 'simple') {
      addToCartApiCallSimple(product.id.toString(), quantity.toString());
    } else if (selectedVariation) {
      const variationData: Record<string, string> = {}
      product?.attributes.forEach(attr => {
        const key = `attribute_${attr.name.toLowerCase().replace(/\s+/g, '_')}`
        variationData[key] = selectedOptions[attr.name]
      })
      
      // Call the API function for variable products
      addToCartApiCallVariation(
        selectedVariation.id.toString(),
        quantity.toString(),
        variationData
      );

    }
  }

    // API Call Functions
    const addToCartApiCallSimple = async (id: string, quantity: string) => {

      if (loading) {
        console.log('Cart key is still loading...');
        return;
      }
      if (cartKeyError) {
        console.error('Error with cart key:', cartKeyError);
        toast.error("Error with cart key", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
        return;
      }
       const endpoint = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/add-item?cart_key=${cartKey}`;
          try {
            const response = await axios.post(
              endpoint,
              new URLSearchParams({
                id: id,
                quantity: quantity.toString(),
              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              }
            );
            console.log('Item added to cart:', response.data);
            toast.success("'Item added to cart", {
              position: "top-center",
              theme: "dark",
              autoClose: 5000,
            });
            await fetchCartDetails(cartKey); // Refresh cart data after adding an item
          } catch (error: any) {
            console.error('Error adding item to cart:', error.response?.data || error.message);
            toast.error("Error adding item to cart", {
              position: "top-center",
              theme: "dark",
              autoClose: 5000,
            });
            return;
            
        }
    };

    const addToCartApiCallVariation = async (id: string, quantity: string, variation: Record<string, string>) => {
      
      if (loading) {
        console.log('Cart key is still loading...');
        return;
      }
      if (cartKeyError) {
        console.error('Error with cart key:', cartKeyError);
        toast.error("Error with cart key", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
        
        return;
      }
    
      const endpoint = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/add-item?cart_key=${cartKey}`;
    
      // Structuring the data as per your required format
      const data = {
        id: id,
        quantity: quantity,
        variation: variation, // Send variation as an object
      };
    
      try {
        const response = await axios.post(endpoint, data);
        console.log('Item added to cart:', response.data);
        toast.success("'Item added to cart", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
        await fetchCartDetails(cartKey); // Refresh cart data after adding an item
      } catch (error: any) {
        console.error('Error adding item to cart:', error.response?.data || error.message);
        toast.error("EError adding item to cart", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });   
      }
    };

    console.log(product?.categories);


  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 md:px-24 py-8 text-white dark:text-black bg-black dark:bg-white min-w-full">
      <ToastContainer />
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={selectedVariation?.image?.src || product.images[activeImageIndex].src}
              alt={selectedVariation?.image?.alt || product.images[activeImageIndex].alt}
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
          <Breadcrumbs
            itemClasses={{
              item: "text-white/60 dark:text-black data-[current=true]:text-white",
              separator: "text-white/40 dark:text-black/40",
            }}
          >
            <BreadcrumbItem href='/' className="text-white dark:text-black hover:font-bold">Home</BreadcrumbItem>
            <BreadcrumbItem href='/store' className="text-white dark:text-black">Store</BreadcrumbItem>
            {product.categories && product.categories.length > 0 && (
              <BreadcrumbItem itemScope
                href={`/store/${encodeURIComponent(product.categories[0].name)}`}
                className="text-white dark:text-black"
              >
                {product.categories[0].name}
              </BreadcrumbItem>
            )}
            <BreadcrumbItem>{product.name}</BreadcrumbItem>
          </Breadcrumbs>
          <br></br>

            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2">
  
            {product.on_sale && (
              <span className="text-2xl font-bold text-muted-foreground line-through">
                ${product.regular_price}
              </span>
            )}
  
            <span className="text-3xl font-bold">
              ${selectedVariation ? selectedVariation.price : product.price}
            </span>
           </div>
            <br />
            <Chip size="lg">{product.stock_status}</Chip>
            <br></br>
            <br></br>
            <div dangerouslySetInnerHTML={{ __html: product.short_description}} />
            <br></br>
          </div>
        
          
          {product.type === 'variable' && product.attributes && (
            <div className="space-y-4">
              {product.attributes.map((attr) => (
                <div key={attr.name}>
                  <label className="block text-sm font-medium mb-2">
                    {attr.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {attr.options.map((option) => {
                      const isAvailable = variations.some((variation) =>
                        variation.attributes.every((varAttr) =>
                          varAttr.name === attr.name
                            ? varAttr.option === option
                            : selectedOptions[varAttr.name] === varAttr.option
                        )
                      )
                      return (
                        <Button
                          key={option}
                          className={`text-white ${
                            selectedOptions[attr.name] === option 
                              ? 'bg-primary' 
                              : isAvailable
                              ? 'bg-black hover:bg-white hover:text-black'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={() => isAvailable && handleVariationChange(attr.name, option)}
                          disabled={!isAvailable}
                        >
                          {option}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto flex items-center bg-white dark:bg-black rounded-full border border-white dark:border-black overflow-hidden">
              <Button
                size="lg"
                className="bg-white dark:bg-black rounded-full p-4 h-12 w-full md:w-8 flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="px-3 text-sm text-black dark:text-white">
                {quantity}
              </span>
              <Button
                size="lg"
                className="bg-white dark:bg-black rounded-full p-4 h-12 w-full md:w-8 flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
  
            <Button 
              onClick={handleAddToCart} 
              className="w-full md:flex-1 bg-white dark:bg-black  rounded-full h-12 flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 h-12 w-4" /> Add to Cart
            </Button>
          </div>
          <div className="flex space-x-4 text-white dark:text-black">
            <Accordion defaultExpandedKeys={["1"]}
              itemClasses={itemClasses}>
              
              <AccordionItem  subtitle="Product Description & Dimensions" key="1" aria-label="ABOUT" title="Description & Dimensions">



   
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              <br></br>
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
              <AccordionItem
              
              key="2" subtitle="Please size down if you are between sizes" aria-label="SIZE GUIDE" title="SIZE GUIDE">
                <div className="bg-black text-white dark:bg-white dark:text-black p-4 rounded">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th className="py-2">Height (cm)</th>
                        <th className="py-2">Weight (kg)</th>
                        <th className="py-2">Pants Size</th>
                        <th className="py-2">Top Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">160-170</td>
                        <td className="py-1">50-55</td>
                        <td className="py-1">26/28</td>
                        <td className="py-1">S/M</td>
                      </tr>
                      <tr>
                        <td className="py-1">165-175</td>
                        <td className="py-1">55-65</td>
                        <td className="py-1">30</td>
                        <td className="py-1">S/M</td>
                      </tr>
                      <tr>
                        <td className="py-1">170-180</td>
                        <td className="py-1">65-75</td>
                        <td className="py-1">30/32</td>
                        <td className="py-1">M/L</td>
                      </tr>
                      <tr>
                        <td className="py-1">185-190</td>
                        <td className="py-1">75-85</td>
                        <td className="py-1">34</td>
                        <td className="py-1">L/XL</td>
                      </tr>
                      <tr>
                        <td className="py-1">185-190</td>
                        <td className="py-1">80-90</td>
                        <td className="py-1">36</td>
                        <td className="py-1">XL</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionItem>
              <AccordionItem key="3" subtitle="Free Shipping on all orders over $100 USD" aria-label="SHIPPING" title="SHIPPING">
                <div className="bg-black text-white dark:bg-white dark:text-black p-4 rounded">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th className="py-2">Location</th>
                        <th className="py-2">Cost</th>
                        <th className="py-2">Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">US / Canada</td>
                        <td className="py-1">$5</td>
                        <td className="py-1">1 - 3 working days</td>
                      </tr>
                      <tr>
                        <td className="py-1">UK / EU Countries</td>
                        <td className="py-1">$5</td>
                        <td className="py-1">1 - 3 working days</td>
                      </tr>
                      <tr>
                        <td className="py-1">Australia</td>
                        <td className="py-1">$5</td>
                        <td className="py-1">1 - 3 working days</td>
                      </tr>
                      <tr>
                        <td className="py-1">International</td>
                        <td className="py-1">$15</td>
                        <td className="py-1">2 - 4 working days</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm mt-4">
                    *Each order requires 24 hours for processing and handling. This does not include weekends or holidays.
                  </p>
                </div>
              </AccordionItem>
            
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

