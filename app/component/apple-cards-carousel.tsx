"use client";

import React, { useState, useEffect } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

// Fallback data
const fallbackData = [
  {
    category: "Men's Clothing",
    title: "Classic Cotton T-Shirt",
    src: "https://images.unsplash.com/photo-1618453292484-6c490547839d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
    content: <></>,
  },
  {
    category: "Women's Clothing",
    title: "Elegant Summer Dress",
    src: "https://images.unsplash.com/photo-1592595293637-8557fa6d3c64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdvbWVuJ3MlMjBDbG90aGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    content: <></>,
  },
  {
    category: "Accessories",
    title: "Stylish Leather Belt",
    src: "https://images.unsplash.com/photo-1608461864721-b8f50c91c147?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFN0eWxpc2glMjBMZWF0aGVyJTIwQmVsdHxlbnwwfHwwfHx8MA%3D%3D",
    content: <></>,
  },
  {
    category: "Footwear",
    title: "Casual Sneakers",
    src: "https://images.unsplash.com/photo-1572601809155-8a9f3191b2d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3R3ZWFyfGVufDB8fDB8fHww",
    content: <></>,
  },
  {
    category: "Kids' Clothing",
    title: "Comfortable Cotton Romper",
    src: "https://images.unsplash.com/photo-1632337948797-ba161d29532b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lkcyUyMGNsb3RoaW5nfGVufDB8fDB8fHww",
    content: <></>,
  },
];

export function AppleCardsCarouselDemo() {
  const [categories, setCategories] = useState(fallbackData);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/getcategories`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        // Transform API data to match our card format
        const transformedData = data.map((category: any) => ({
          category: category.name,
          title: category.description || "No Description Available",
          src: category.image?.src || "https://via.placeholder.com/800",
          content: <></>,
        }));

        setCategories(transformedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Keep using fallback data if there's an error
        setCategories(fallbackData);
      }
    };

    fetchCategories();
  }, []);

  const cards = categories.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full max-w-7xl h-full py-4 dark:bg-white dark:text-black">
      <Carousel items={cards} title="Shop By Categories" />
    </div>
  );
}
