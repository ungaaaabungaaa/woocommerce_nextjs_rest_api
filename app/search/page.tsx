'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChips, setSelectedChips] = useState<string[]>([])

  const categories = ['Shirts', 'Pants', 'Dresses', 'Accessories', 'Hoodies' , 'Shoes']

  const handleChipToggle = (category: string) => {
    setSelectedChips(prev =>
      prev.includes(category)
        ? prev.filter(chip => chip !== category)
        : [...prev, category]
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm, 'in categories:', selectedChips)
    // Here you would typically handle the search logic or navigation
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl p-2 bg-white flex items-center justify-center  rounded-lg">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center border-b border-gray-300">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-grow py-2 px-4 text-black focus:outline-none"
              aria-label="Search products"
            />
            <button type="submit" className="p-2" aria-label="Submit search">
              <Search className="w-5 h-5 text-black" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleChipToggle(category)}
                className={`py-1 px-3 rounded-full text-sm ${
                  selectedChips.includes(category)
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
