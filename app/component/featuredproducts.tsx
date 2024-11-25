'use client';
import React, { useEffect, useState } from 'react';
import ProductGrid from './productgrid';
import axios from 'axios';

const sampleProducts = [
    {
      id: 1,
      title: "Training Shoes",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor, augue eget cursus mattis.",
      image: "https://images.unsplash.com/photo-1706029831385-c3388fa66b5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VHJhaW5pbmclMjBTaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      isNew: true,
      price: "$129.99",
      slug: "training-shoes",
      type:"simple"
    },
    {
      id: 2,
      title: "Sneakers",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor, augue eget cursus mattis.",
      image: "https://images.unsplash.com/photo-1599670998937-441a3a74b2f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      price: "$99.99",
      slug: "sneakers",
      type:"simple",
    },
    {
      id: 3,
      title: "Running Shoes",
      description: "Perfect for long-distance running, designed for comfort and durability.",
      image: "https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UnVubmluZyUyMFNob2VzfGVufDB8fDB8fHww",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      isNew: true,
      price: "$119.99",
      slug: "running-shoes",
      type:"simple",
    },
    {
      id: 4,
      title: "Formal Shoes",
      description: "Elegant and stylish formal shoes for business and occasions.",
      image: "https://images.unsplash.com/photo-1689620400465-cd736688c41f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEZvcm1hbCUyMFNob2VzfGVufDB8fDB8fHww",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      price: "$139.99",
      slug: "formal-shoes",
      type:"simple",
    },
    {
      id: 5,
      title: "Casual Shoes",
      description: "Comfortable and versatile casual shoes for everyday wear.",
      image: "https://images.unsplash.com/photo-1659724526385-892d72734cc1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fENhc3VhbCUyMFNob2VzfGVufDB8fDB8fHww",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      price: "$79.99",
      slug: "casual-shoes",
      type:"simple",
    },
    {
      id: 6,
      title: "Hiking Boots",
      description: "Durable and waterproof boots for hiking adventures.",
      image: "https://images.unsplash.com/photo-1678222532251-2f303290c1e5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SGlraW5nJTIwQm9vdHN8ZW58MHx8MHx8fDA%3D",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      isNew: true,
      price: "$159.99",
      slug: "hiking-boots",
      type:"simple",
    },
    {
      id: 7,
      title: "Loafers",
      description: "Stylish loafers that pair perfectly with any outfit.",
      image: "https://images.unsplash.com/photo-1631978278971-9afda1670882?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fExvYWZlcnN8ZW58MHx8MHx8fDA%3D",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      price: "$89.99",
      slug: "loafers",
      type:"simple",
    },
    {
      id: 8,
      title: "Sandals",
      description: "Lightweight and breathable sandals for hot summer days.",
      image: "https://images.unsplash.com/photo-1491378630646-3440efa57c3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2h8ZW58MHx8MHx8fDA%3D",
      hoverimage: "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFic3RyYWN0fGVufDB8fDB8fHww",
      price: "$49.99",
      slug: "sandals",
      type:"simple",
    },
];

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/getproduct`);
      const fetchedProducts = response.data.products.map((product: any) => ({
        id: product.id,
        title: product.name,
        description: product.short_description || product.description,
        image: product.images?.[0]?.src || 'https://via.placeholder.com/800',
        hoverimage: product.images?.[1]?.src || product.images?.[0]?.src || 'https://via.placeholder.com/800',
        isNew: product.featured,
        price: `$${product.price}`,
        slug: product.slug,
        type: product.type || 'simple',
      }));
      setProducts(fetchedProducts);
    } catch (error: any) {
      console.log(error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Sanitize HTML for description (optional, use if descriptions are untrusted)
  const sanitizeDescription = (description: string) => {
    return description.replace(/<[^>]+>/g, ''); // Strips HTML tags
  };

  const limitedProducts = (products.length > 0 ? products : sampleProducts).slice(0, 16);

  return (
    <div className="w-full h-full py-5">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans">
        Featured Products.
      </h2>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ProductGrid
          products={limitedProducts.map((product) => ({
            ...product,
            description: sanitizeDescription(product.description),
          }))}
        />
      )}
    </div>
  );
}

export default FeaturedProducts;
