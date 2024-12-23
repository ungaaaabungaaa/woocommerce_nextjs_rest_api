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

const categories = [
  { name: "ALL", count: 115 },
  { name: "HOME", count: 12 },
  { name: "AWAY", count: 34 },
  { name: "THIRD", count: 123 },
  { name: "GOALKEEPER", count: 52 },
  { name: "SHOP BY PLAYER", count: 78 },
  { name: "FULL KIT", count: 90 },
];

export default function ChipsChategoriesFilter() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeSheet, setActiveSheet] = useState<
    "filter" | "recommended" | null
  >(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openSheet = (sheet: "filter" | "recommended") => {
    setActiveSheet(sheet);
  };

  const closeSheet = () => {
    setActiveSheet(null);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
          {/* Categories Scroll - Full width on mobile */}
          <div className="w-full mb-4 md:mb-0 md:max-w-[calc(100%-300px)]">
            <div
              className="overflow-x-auto"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="flex space-x-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors shrink-0
                      ${
                        selectedCategory === category.name
                          ? "bg-white hover:bg-gray-100 border border-gray-200 text-black"
                          : "bg-black text-white "
                      }`}
                  >
                    {category.name}
                    {category.count && ` (${category.count})`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Buttons - 50/50 split on mobile */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            <Sheet
              open={activeSheet === "recommended"}
              onOpenChange={() =>
                activeSheet === "recommended"
                  ? closeSheet()
                  : openSheet("recommended")
              }
            >
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Recommended
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

            <Sheet
              open={activeSheet === "filter"}
              onOpenChange={() =>
                activeSheet === "filter" ? closeSheet() : openSheet("filter")
              }
            >
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
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
          </div>

          {/* Desktop Filter Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className=" text-white p- mr-4 ml-4">115</div>
            <Sheet
              open={activeSheet === "filter"}
              onOpenChange={() =>
                activeSheet === "filter" ? closeSheet() : openSheet("filter")
              }
            >
              <SheetTrigger asChild>
                <Button size="sm" className="w-[120px]">
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

            <Sheet
              open={activeSheet === "recommended"}
              onOpenChange={() =>
                activeSheet === "recommended"
                  ? closeSheet()
                  : openSheet("recommended")
              }
            >
              <SheetTrigger asChild>
                <Button size="sm" className="w-[120px]">
                  Recommended
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
