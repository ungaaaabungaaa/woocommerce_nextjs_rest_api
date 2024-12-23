"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

interface ChipsCategoriesFilterProps {
  notDisplay?: string[];
  highlight?: string;
}

export default function ChipsChategoriesFilter({
  notDisplay = [],
  highlight = "",
}: ChipsCategoriesFilterProps) {
  const [categories, setCategories] = useState([{ name: "ALL", count: 0 }]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeSheet, setActiveSheet] = useState<
    "filter" | "recommended" | null
  >(null);
  const [isMobile, setIsMobile] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/getcategories`
        );
        const apiCategories = response.data
          .filter(
            (category: any) => !notDisplay.includes(category.name.toUpperCase())
          )
          .map((category: any) => ({
            name: category.name.toUpperCase(),
            count: category.count || 0,
          }));

        const totalCount = apiCategories.reduce(
          (sum: number, cat: any) => sum + cat.count,
          0
        );

        setTotalProducts(totalCount);
        setCategories([
          {
            name: "ALL",
            count: totalCount,
          },
          ...apiCategories,
        ]);
      } catch (error: any) {
        console.error(
          "Error fetching categories:",
          error.response?.data || error.message
        );
        toast.error("Error fetching categories", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    };

    fetchCategories();
  }, [notDisplay]);

  const openSheet = (sheet: "filter" | "recommended") => {
    setActiveSheet(sheet);
  };

  const closeSheet = () => {
    setActiveSheet(null);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
          {/* Categories Scroll */}
          <div className="w-full md:flex-1">
            <div
              className="overflow-x-auto hide-scrollbar"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="flex space-x-2 pb-2 px-1">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors shrink-0
                    ${
                      selectedCategory === category.name ||
                      category.name === highlight
                        ? "bg-white hover:bg-gray-100 border border-gray-200 text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    {category.name}{" "}
                    {category.count > 0 ? `(${category.count})` : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Count and Buttons */}
          <div className="flex items-center space-x-4 md:flex-shrink-0 pb-2">
            {/* Count */}
            <div className="text-white dark:text-black whitespace-nowrap hidden md:block pl-4 ">
              {totalProducts} Products
            </div>

            {/* Filter Button */}
            <Sheet
              open={activeSheet === "filter"}
              onOpenChange={() =>
                activeSheet === "filter" ? closeSheet() : openSheet("filter")
              }
            >
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  className="w-[120px] bg-black dark:bg-white text-white dark:text-black"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isMobile ? "bottom" : "right"}
                className={`w-full h-[75vh] md:w-[400px] md:h-full`}
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <p>Filter options will be displayed here.</p>
                </div>
              </SheetContent>
            </Sheet>

            {/* Recommended Button */}
            <Sheet
              open={activeSheet === "recommended"}
              onOpenChange={() =>
                activeSheet === "recommended"
                  ? closeSheet()
                  : openSheet("recommended")
              }
            >
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  className="w-[120px] bg-black dark:bg-white text-white dark:text-black"
                >
                  <ArrowUpDown className="w-4 h-4 mr-2   " />
                  Sort
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isMobile ? "bottom" : "right"}
                className={`w-full h-[75vh] md:w-[400px] md:h-full`}
              >
                <SheetHeader>
                  <SheetTitle>Sort By</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <p>Sorting options will be displayed here.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
