'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/getcategories`);
        const categoryNames = response.data.map((category: { name: string }) => category.name);
        setCategories(categoryNames);
      } catch (error:any) {
        console.error('Error fetching categories:', error.response?.data || error.message);
        toast.error( "Error fetching categories", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    };

    fetchCategories();
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
    // Use template literals to construct the path
    router.push(`/store/${searchTerm}`);
    // Trigger API or other logic for search term
  };

  // Handle chip selection
  const handleChipClick = (category: string) => {
    console.log('Selected Chip:', category);
    router.push(`/store/${category}`);
    setSelectedChips((prev) =>
      prev.includes(category) ? prev.filter((chip) => chip !== category) : [...prev, category]
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black dark:bg-white">
      <ToastContainer />
      <div className="w-full max-w-2xl p-2 bg-black dark:bg-white flex items-center justify-center rounded-lg">
        <div className="space-y-4 w-full">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center border-b border-gray-300 ">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-grow py-2 px-4 text-white bg-black focus:outline-none dark:text-black dark:bg-white"
              aria-label="Search products"
            />
            <button type="submit" className="p-2" aria-label="Submit search">
              <Search className="w-5 h-5 text-white bg-black dark:text-black dark:bg-white" />
            </button>
          </form>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleChipClick(category)}
                  className={`py-1 px-3 rounded-full text-sm ${
                    selectedChips.includes(category)
                      ? 'bg-white text-black hover:text-white hover:bg-black  dark:bg-black dark:text-white dark:hover:text-black dark:hover:bg-white'
                      : 'bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))
            ) : (
              <p className="text-white">Loading categories...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
