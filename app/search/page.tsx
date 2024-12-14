'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecommendedProducts } from '../component/RecommendedProducts';

// Static data for recommended products
const staticRecommendedProducts = [
  {
    id: '1',
    name: 'Polo',
    image: 'https://clothvillage.com/wp-content/uploads/2024/11/polo-scaled.jpg',
    price: 20.00,
    url: 'product/90'
  },
  {
    id: '2',
    name: 'Hoodie',
    image: 'https://clothvillage.com/wp-content/uploads/2024/11/redicul-pict-ggcJKGpx3pI-unsplash-scaled.jpg',
    price: 10.00,
    url: 'product/68'
  },
  {
    id: '3',
    name: 'T-Shirt',
    image: 'https://clothvillage.com/wp-content/uploads/2024/11/T-Shirt2-scaled.jpg',
    price: 92.00,
    url: 'product/74'
  },
  {
    id: '4',
    name: 'Sunglasses',
    image: 'https://clothvillage.com/wp-content/uploads/2024/11/Sunglasses2-scaled.jpg',
    price: 90.00,
    url: 'product/82'
  }
];


export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState(staticRecommendedProducts);

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
    router.push(`/store/${searchTerm}`);
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
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-black dark:bg-white">
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
            className="flex-grow py-2 px-4 text-white bg-black focus:outline-none dark:text-black dark:bg-white placeholder-white dark:placeholder-black"
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
              <p className="text-white dark:text-black">Loading categories...</p>
            )}
          </div>
          <br></br>
          {/* Recommended Products */}
          <RecommendedProducts products={recommendedProducts} />
        </div>
      </div>
    </div>
  );
}

