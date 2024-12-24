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
import { useRouter } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Slider } from "@nextui-org/slider";
import { toast } from "react-toastify";
import axios from "axios";

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
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(25);
  const [isAccordionDefaultOpen, setIsAccordionDefaultOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsAccordionDefaultOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const genderOptions = ["MENS", "WOMENS", "UNISEX", "YOUTH"];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL"];
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
    if (array.includes(value)) {
      setter(array.filter((item) => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handlePriceChange = (value: number | number[]) => {
    setPriceRange(Array.isArray(value) ? value[0] : value);
  };

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);
    closeSheet();
  };

  const applyFilters = () => {
    console.log({
      gender: selectedGender,
      sizes: selectedSizes,
      colors: selectedColors,
      priceRange: `$${priceRange}`,
    });
    closeSheet();
  };

  const clearFilters = () => {
    setSelectedGender([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(25);
  };

  const openSheet = (sheet: "filter" | "recommended") => {
    setActiveSheet(sheet);
  };

  const closeSheet = () => {
    setActiveSheet(null);
  };

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
                className="w-full h-[75vh] md:w-[400px] md:h-full text-black dark:text-white"
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
                      <AccordionItem key="1" aria-label="Gender" title="Gender">
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

                      <AccordionItem key="3" aria-label="Colors" title="Colors">
                        <div className="flex flex-wrap gap-2 p-2">
                          {colorOptions.map((color) => (
                            <Button
                              key={color.value}
                              className={`${
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
                        className="w-full bg-black text-white hover:bg-gray-800"
                        onClick={applyFilters}
                      >
                        Apply Filters
                      </Button>
                      <Button
                        className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100"
                        onClick={clearFilters}
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
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
                className="w-full h-[75vh] md:w-[400px] md:h-full"
              >
                <SheetHeader>
                  <SheetTitle>Sorting</SheetTitle>
                </SheetHeader>
                <div className="py-4 text-black dark:text-white flex align-top justify-center flex-col">
                  <div className="flex flex-col gap-2 w-full max-w-[400px] mx-auto mt-4">
                    {["NEWEST", "LOW - HIGH", "HIGH - LOW", "SALE"].map(
                      (option) => (
                        <Button
                          key={option}
                          className={`w-full ${
                            selectedSort === option
                              ? "bg-black text-white hover:bg-gray-800"
                              : "bg-white text-black border border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => handleSortChange(option as SortOption)}
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
  );
}
