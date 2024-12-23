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
import { useRouter } from "next/navigation";

interface ChipsCategoriesFilterProps {
  notDisplay?: string[];
  highlight?: string;
}

type SortOption =
  | "RECOMMENDED"
  | "BESTSELLERS"
  | "NEWEST"
  | "LOW - HIGH"
  | "HIGH - LOW"
  | "SALE";

// Helper functions
const filterCategories = (categories: any[]) => {
  return categories.filter(
    (category) =>
      category.name.toUpperCase() !== "UNCATEGORIZED" &&
      category.name.toUpperCase() !== "ALL"
  );
};

const calculateTotalProducts = (categories: any[]) => {
  return categories.reduce(
    (sum: number, cat: any) => sum + (cat.count || 0),
    0
  );
};

export default function ChipsChategoriesFilter({
  notDisplay = [],
  highlight = "",
}: ChipsCategoriesFilterProps) {
  const [categories, setCategories] = useState<
    Array<{ name: string; count: number }>
  >([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeSheet, setActiveSheet] = useState<
    "filter" | "recommended" | null
  >(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>("RECOMMENDED");
  const [isMobile, setIsMobile] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const router = useRouter();

  const sortOptions: SortOption[] = [
    "NEWEST",
    "LOW - HIGH",
    "HIGH - LOW",
    "SALE",
  ];

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

        const apiCategories = filterCategories(response.data)
          .filter(
            (category: any) => !notDisplay.includes(category.name.toUpperCase())
          )
          .map((category: any) => ({
            name: category.name.toUpperCase(),
            count: category.count || 0,
          }));

        const rearrangedCategories = highlight
          ? [
              ...apiCategories.filter(
                (category) => category.name === highlight.toUpperCase()
              ),
              ...apiCategories.filter(
                (category) => category.name !== highlight.toUpperCase()
              ),
            ]
          : apiCategories;

        const total = calculateTotalProducts(rearrangedCategories);
        setTotalProducts(total);
        setCategories(rearrangedCategories);

        if (rearrangedCategories.length > 0) {
          setSelectedCategory(rearrangedCategories[0].name);
        }
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
  }, [notDisplay, highlight]);

  const categoriesSelected = (category: string) => {
    console.log("Selected category:", category);
    router.push(`/store/${category}`);
  };

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);
    console.log("Sort option selected:", option);
    // Here you can add your sorting logic
    closeSheet();
  };

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
          <div className="w-full md:max-w-[72%] md:flex-1">
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
                    onClick={() => categoriesSelected(category.name)}
                    className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors shrink-0
                ${
                  selectedCategory === category.name ||
                  category.name === highlight
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Count and Buttons */}
          <div className="flex items-center space-x-4 md:flex-shrink-0 pb-2">
            {/* Count */}
            <div className="text-white dark:text-black whitespace-nowrap pl-4 hidden md:block">
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
                className={`w-full h-[75vh] md:w-[400px] md:h-full text-black dark:text-white`}
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4 text-black dark:text-white">
                  <p>Filter options will be displayed </p>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Button */}
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
                  <ArrowUpDown className="w-4 h-4 mr-2" />
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
                <div className="py-4 text-black dark:text-white flex align-top justify-center flex-col">
                  <div className="flex flex-col gap-2 w-full max-w-[400px] mx-auto mt-4">
                    {sortOptions.map((option) => (
                      <Button
                        key={option}
                        className={`w-full transition-colors ${
                          selectedSort === option
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-white text-black border border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => handleSortChange(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}

// make the remaning filter
// make a context api to get the data everywhere
// get in the store
