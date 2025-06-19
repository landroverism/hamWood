"use client";

import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useRouter } from 'next/navigation';

const SearchFilter = ({ activeCategory, onCategoryChange }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  useEffect(() => {
    // Get URL parameters on component mount
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
    const minPrice = params.get('minPrice') || '';
    const maxPrice = params.get('maxPrice') || '';
    
    setSearchTerm(search);
    setPriceRange({ min: minPrice, max: maxPrice });
  }, []);
  
  const categories = [
    { label: "Ready", value: "ready", icon: "🛋️" },
    { label: "Antics", value: "antics", icon: "🏺" },
    { label: "New", value: "new", icon: "✨" },
    { label: "Recliners", value: "recliners", icon: "💺" },
    { label: "Office", value: "office", icon: "🖥️" },
    { label: "Pillows", value: "pillows", icon: "🛏️" },
    { label: "Beds", value: "beds", icon: "🛌" },
    { label: "Repair", value: "repair", icon: "🔧" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let queryParams = new URLSearchParams();
    
    // Add category
    queryParams.append('category', activeCategory);
    
    // Add search term if present
    if (searchTerm.trim()) {
      queryParams.append('search', searchTerm.trim());
    }
    
    // Add price range if present
    if (priceRange.min) {
      queryParams.append('minPrice', priceRange.min);
    }
    
    if (priceRange.max) {
      queryParams.append('maxPrice', priceRange.max);
    }
    
    router.push(`/products?${queryParams.toString()}`);
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    setIsMobileFilterOpen(false);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    router.push(`/products?category=${activeCategory}`);
  };
  
  const handlePriceChange = (type, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="sticky top-0 z-20 bg-gradient-to-r from-amber-50 to-emerald-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search furniture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-full border-2 border-amber-300 focus:border-emerald-500 focus:outline-none"
              />
              <SearchIcon className="absolute left-3 text-amber-800" />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={handleClearSearch}
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon fontSize="small" />
                </button>
              )}
            </div>
            
            {/* Advanced Filter Toggle */}
            <div className="flex justify-end mt-2">
              <button 
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-xs flex items-center text-emerald-700 hover:text-emerald-900"
              >
                <TuneIcon fontSize="small" className="mr-1" />
                {showAdvancedFilters ? 'Hide filters' : 'Advanced filters'}
              </button>
            </div>
            
            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-3 p-3 bg-white rounded-lg shadow-sm border border-amber-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <AttachMoneyIcon fontSize="small" className="mr-1 text-amber-600" />
                      Price Range (KSH)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="w-full px-3 py-1.5 rounded border-2 border-amber-200 focus:border-emerald-500 focus:outline-none text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="text"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="w-full px-3 py-1.5 rounded border-2 border-amber-200 focus:border-emerald-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button 
                      type="submit"
                      className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
          
          {/* Desktop Category Filters */}
          <div className="hidden md:flex flex-wrap gap-2 justify-end">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`px-3 py-1.5 rounded-full font-medium text-sm transition-all flex items-center ${
                  activeCategory === category.value
                    ? "bg-gradient-to-r from-amber-600 to-emerald-600 text-white"
                    : "border-2 border-amber-200 text-emerald-700 hover:bg-amber-100"
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-full"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <FilterListIcon className="mr-1" fontSize="small" />
            Filter
          </button>
        </div>
        
        {/* Mobile Category Filters */}
        {isMobileFilterOpen && (
          <div className="md:hidden mt-3 grid grid-cols-2 gap-2 pb-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`px-3 py-2 rounded-full font-medium text-sm transition-all flex items-center justify-center ${
                  activeCategory === category.value
                    ? "bg-gradient-to-r from-amber-600 to-emerald-600 text-white"
                    : "border-2 border-amber-200 text-emerald-700 hover:bg-amber-100"
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
