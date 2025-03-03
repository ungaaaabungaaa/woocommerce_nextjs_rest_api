"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@nextui-org/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Slider } from "@nextui-org/slider";

interface Category {
  name: string;
  count: number;
}

interface ChipsCategoriesFilterProps {
  categories: Category[];
  notDisplay?: string[];
  highlight?: string;
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sort: SortOption) => void;
  totalProducts: number;
  onAllCategoryClick?: (total: number) => void; // Modified type
}

interface FilterState {
  gender: string[];
  sizes: string[];
  colors: string[];
  priceRange: number;
}

type SortOption =
  | "RECOMMENDED"
  | "BESTSELLERS"
  | "NEWEST"
  | "LOW - HIGH"
  | "HIGH - LOW"
  | "SALE";

const filterCategories = (categories: Array<Category>): Category[] => {
  if (!Array.isArray(categories)) return [];

  return categories.filter(
    (category: Category) =>
      category?.name?.toUpperCase() !== "UNCATEGORIZED" &&
      category?.name?.toUpperCase() !== "ALL"
  );
};

export default function ChipsChategoriesFilter({
  categories: initialCategories = [],
  notDisplay = [],
  highlight = "",
  onFilterChange,
  onSortChange,
  totalProducts,
  onAllCategoryClick, // Destructure the new prop
}: ChipsCategoriesFilterProps) {
  const [activeSheet, setActiveSheet] = useState<
    "filter" | "recommended" | null
  >(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>("RECOMMENDED");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(25);
  const [isAccordionDefaultOpen, setIsAccordionDefaultOpen] = useState(true);
  const router = useRouter();

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [allCategorySelected, setAllCategorySelected] = useState(false); // New state for tracking ALL chip selection
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Memoize processed categories
  const { categories, selectedCategory } = useMemo(() => {
    const filteredCategories = filterCategories(initialCategories)
      .filter((category) => !notDisplay.includes(category.name.toUpperCase()))
      .map((category) => ({
        name: category.name.toUpperCase(),
        count: category.count || 0,
      }));

    const rearrangedCategories = highlight
      ? [
          ...filteredCategories.filter(
            (category) => category.name === highlight.toUpperCase()
          ),
          ...filteredCategories.filter(
            (category) => category.name !== highlight.toUpperCase()
          ),
        ]
      : filteredCategories;

    const selected =
      rearrangedCategories.length > 0 ? rearrangedCategories[0].name : "";

    return {
      categories: rearrangedCategories,
      selectedCategory: selected,
    };
  }, [initialCategories, notDisplay, highlight]);

  // Check if container is overflowing
  const checkOverflow = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollWidth, clientWidth } = container;
      const hasOverflow = scrollWidth > clientWidth;
      setIsOverflowing(hasOverflow);

      // Also update arrow visibility if we're keeping that functionality
      checkScrollPosition();
    }
  };

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Handle window resize and initial load
  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      // Initial check for overflow
      checkOverflow();

      // Set up scroll event listener
      container.addEventListener("scroll", checkScrollPosition);

      // Check again after a short delay (for loading content)
      setTimeout(checkOverflow, 100);

      // Check on window resize
      const handleResize = () => {
        checkOverflow();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        if (container) {
          container.removeEventListener("scroll", checkScrollPosition);
        }
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [categories]);

  const genderOptions = [
    "MENS",
    "WOMENS",
    "UNISEX",
    "YOUTH",
    "GAY",
    "BISEXUAL",
  ];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const colorOptions = [
    { name: "White", value: "white" },
    { name: "Black", value: "black" },
    { name: "Blue", value: "blue" },
    { name: "Red", value: "red" },
    { name: "Gray", value: "gray" },
    { name: "Purple", value: "purple" },
  ];

  const toggleFilter = (
    array: string[],
    value: string,
    setter: (value: string[]) => void
  ) => {
    const newArray = array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
    setter(newArray);
  };

  const handlePriceChange = (value: number | number[]) => {
    setPriceRange(Array.isArray(value) ? value[0] : value);
  };

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);
    onSortChange?.(option);
    closeSheet();
  };

  const applyFilters = () => {
    const filters: FilterState = {
      gender: selectedGender,
      sizes: selectedSizes,
      colors: selectedColors,
      priceRange: priceRange,
    };
    onFilterChange?.(filters);
    closeSheet();
  };

  const clearFilters = () => {
    setSelectedGender([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(25);
    onFilterChange?.({
      gender: [],
      sizes: [],
      colors: [],
      priceRange: 25,
    });
  };

  const openSheet = (sheet: "filter" | "recommended") => {
    setActiveSheet(sheet);
  };

  const closeSheet = () => {
    setActiveSheet(null);
  };

  const categoriesSelected = (category: string) => {
    setAllCategorySelected(false);
    router.push(`/store/${category}`);
  };

  // Handle ALL category click
  const handleAllCategoryClick = () => {
    setAllCategorySelected(true);

    if (onAllCategoryClick) {
      onAllCategoryClick(totalProducts); // Pass the total count
    } else {
      // Default behavior if no specific handler is provided
      router.push("/store");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0 pb-2">
          {/* Categories Scroll */}

          {/* Categories Scroll with Arrows */}
          <div className="w-full md:max-w-[72%] md:flex-1 relative">
            {/* Left Arrow - Only show when overflowing AND showLeftArrow is true */}
            {isOverflowing && showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="hidden md:block absolute left-0 z-10 bg-black dark:bg-white backdrop-blur-sm p-1 transition-all"
                style={{ top: "50%", transform: "translateY(-50%)" }}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-7 h-7 text-white dark:text-black" />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto hide-scrollbar relative"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onScroll={checkScrollPosition}
            >
              <div className="flex space-x-2 px-1">
                {/* ALL chip - always first */}
                <button
                  onClick={handleAllCategoryClick}
                  className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors shrink-0
                    ${
                      allCategorySelected
                        ? "bg-black text-white border border-white"
                        : "bg-gray-800 text-white hover:bg-black"
                    }`}
                >
                  ALL ({totalProducts})
                </button>

                {/* Existing category chips */}
                {categories.map((category: any) => (
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

            {/* Right Arrow - Only show when overflowing AND showRightArrow is true */}
            {isOverflowing && showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="hidden md:block absolute right-0 z-10 bg-none backdrop-blur-sm p-1 bg-black dark:bg-white transition-all"
                style={{ top: "50%", transform: "translateY(-50%)" }}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-7 h-7 text-white dark:text-black" />
              </button>
            )}
          </div>

          {/* Count and Buttons */}
          <div className="flex items-center w-full md:w-auto md:space-x-4 md:flex-shrink-0 pb-2">
            {/* Count */}
            <div className="text-white dark:text-black whitespace-nowrap pl-4 hidden md:block">
              {totalProducts} Products
            </div>

            {/* Mobile Buttons Container */}
            <div className="grid grid-cols-2 gap-2 w-full md:flex md:gap-4">
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
                    className="w-full md:w-[120px] bg-black dark:bg-white text-white dark:text-black"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={isMobile ? "bottom" : "right"}
                  className="w-full h-[75vh] md:w-[400px] md:h-full text-black dark:text-white md:rounded-l-lg"
                >
                  <SheetHeader>
                    <SheetTitle>Filter Categories</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 text-black dark:text-white flex align-top justify-center flex-col">
                    <div className="flex flex-col gap-2 w-full max-w-[400px] mx-auto mt-4">
                      <Accordion
                        defaultExpandedKeys={
                          isAccordionDefaultOpen ? ["1", "2", "3", "4"] : []
                        }
                      >
                        <AccordionItem
                          key="1"
                          aria-label="Gender"
                          title="Gender"
                        >
                          <div className="flex flex-wrap gap-2 p-2">
                            {genderOptions.map((gender) => (
                              <Button
                                key={gender}
                                className={`${
                                  selectedGender.includes(gender)
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-200"
                                }`}
                                onClick={() =>
                                  toggleFilter(
                                    selectedGender,
                                    gender,
                                    setSelectedGender
                                  )
                                }
                              >
                                {gender}
                              </Button>
                            ))}
                          </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Sizes" title="Sizes">
                          <div className="flex flex-wrap gap-2 p-2">
                            {sizeOptions.map((size) => (
                              <Button
                                key={size}
                                className={`${
                                  selectedSizes.includes(size)
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-200"
                                }`}
                                onClick={() =>
                                  toggleFilter(
                                    selectedSizes,
                                    size,
                                    setSelectedSizes
                                  )
                                }
                              >
                                {size}
                              </Button>
                            ))}
                          </div>
                        </AccordionItem>

                        <AccordionItem
                          key="3"
                          aria-label="Colors"
                          title="Colors"
                        >
                          <div className="flex flex-wrap gap-2 p-2">
                            {colorOptions.map((color) => (
                              <Button
                                key={color.value}
                                className={`relative ${
                                  selectedColors.includes(color.value)
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-200"
                                }`}
                                onClick={() =>
                                  toggleFilter(
                                    selectedColors,
                                    color.value,
                                    setSelectedColors
                                  )
                                }
                              >
                                <div
                                  className="w-4 h-4 rounded-full mr-2 inline-block border border-gray-200"
                                  style={{ backgroundColor: color.value }}
                                />
                                {color.name}
                              </Button>
                            ))}
                          </div>
                        </AccordionItem>

                        <AccordionItem key="4" aria-label="Price" title="Price">
                          <div className="px-4 py-2">
                            <div className="flex justify-between mb-4">
                              <span>$25</span>
                              <span>${priceRange}</span>
                            </div>
                            <Slider
                              aria-label="Price Range"
                              step={1}
                              maxValue={75}
                              minValue={25}
                              value={priceRange}
                              onChange={handlePriceChange}
                              className="max-w-md"
                              size="sm"
                            />
                          </div>
                        </AccordionItem>
                      </Accordion>

                      <div className="flex flex-col gap-2 mt-4 px-2">
                        <Button
                          className="w-full bg-black text-white dark:bg-white dark:text-black"
                          onClick={applyFilters}
                        >
                          Apply Filters
                        </Button>
                        <Button
                          className="w-full bg-white text-black dark:bg-black dark:text-white"
                          onClick={clearFilters}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
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
                    className="w-full md:w-[120px] bg-black dark:bg-white text-white dark:text-black"
                  >
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={isMobile ? "bottom" : "right"}
                  className="w-full h-[75vh] md:w-[400px] md:h-full text-black dark:text-white md:rounded-l-lg"
                >
                  <SheetHeader>
                    <SheetTitle>Sorting</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 text-black dark:text-white flex align-top justify-center flex-col">
                    <div className="flex flex-col gap-2 w-full max-w-[400px] mx-auto mt-4">
                      {["NEWEST", "LOW - HIGH", "HIGH - LOW", "FEATURED"].map(
                        (option) => (
                          <Button
                            key={option}
                            className={`w-full ${
                              selectedSort === option
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-white text-black border border-gray-200 hover:bg-gray-100"
                            }`}
                            onClick={() =>
                              handleSortChange(option as SortOption)
                            }
                          >
                            {option}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}