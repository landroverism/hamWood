"use client";

import React, { useEffect, useState } from "react";
import Ready from "../components/Ready";
import Recliners from "../components/Recliners";
import NewFurniture from "../components/NewFurniture";
import Beds from "../components/Beds";
import Office from "../components/Office";
import Repair from "../components/Repair";
import Pillows from "../components/Pillows";
import Antics from "../components/Antics";
import SearchFilter from "../components/SearchFilter";

import { useRouter } from "next/navigation";
import SouthIcon from "@mui/icons-material/South";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";

function Page() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [filteredResults, setFilteredResults] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") || "ready"; // Default to "ready"
    const search = params.get("search") || "";
    const minPrice = params.get("minPrice") || "";
    const maxPrice = params.get("maxPrice") || "";
    
    setCategory(cat);
    setSearchTerm(search);
    setPriceRange({ min: minPrice, max: maxPrice });
    
    // If there's a search term or price range, we'll need to filter results
    if (search || minPrice || maxPrice) {
      performSearch(cat, search, { min: minPrice, max: maxPrice });
    } else {
      setFilteredResults(null); // No filtering needed
    }
  }, []);

  // Function to handle category change
  const handleCategoryChange = (newCategory) => {
    const params = new URLSearchParams(window.location.search);
    const currentSearch = params.get("search") || "";
    const minPrice = params.get("minPrice") || "";
    const maxPrice = params.get("maxPrice") || "";
    
    // Build new URL params
    const newParams = new URLSearchParams();
    newParams.append("category", newCategory);
    
    if (currentSearch) {
      newParams.append("search", currentSearch);
    }
    
    if (minPrice) {
      newParams.append("minPrice", minPrice);
    }
    
    if (maxPrice) {
      newParams.append("maxPrice", maxPrice);
    }
    
    // Update URL with new category and maintain other filters
    router.push(`/products?${newParams.toString()}`);
    
    setCategory(newCategory);
    
    // If there are active filters, reapply them to the new category
    if (currentSearch || minPrice || maxPrice) {
      performSearch(newCategory, currentSearch, { min: minPrice, max: maxPrice });
    } else {
      setFilteredResults(null);
    }
  };

  // Function to perform search across the current category
  const performSearch = (cat, term, prices = { min: '', max: '' }) => {
    // This would ideally be a more sophisticated search
    // For now, we'll filter by name, quality, and price range
    const searchLower = term.toLowerCase();
    const minPrice = prices.min ? parseInt(prices.min) : 0;
    const maxPrice = prices.max ? parseInt(prices.max) : Number.MAX_SAFE_INTEGER;
    
    // Helper function to check if an item matches the price range
    const matchesPrice = (item) => {
      // Extract price from the item - handle different price formats
      let itemPrice = 0;
      if (item.price) {
        // Try to extract numeric price from string like "KSH 25,000"
        const priceMatch = item.price.toString().match(/\d+[\d,]*/g);
        if (priceMatch) {
          itemPrice = parseInt(priceMatch[0].replace(/,/g, ''));
        }
      }
      
      return itemPrice >= minPrice && itemPrice <= maxPrice;
    };
    
    // Helper function to check if an item matches the search term
    const matchesSearch = (item) => {
      if (!term) return true; // If no search term, all items match
      
      return (
        (item.name && item.name.toLowerCase().includes(searchLower)) ||
        (item.quality && item.quality.toLowerCase().includes(searchLower)) ||
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        (item.description && item.description.toLowerCase().includes(searchLower))
      );
    };
    
    let results;
    switch (cat) {
      case "ready":
        // Import the data directly from the component
        const readyData = require("../helpers/helpers").readyMade1;
        results = readyData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      case "new":
        const newData = require("../helpers/helpers").newFurniture;
        results = newData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      case "repair":
        const repairData = require("../helpers/helpers").repair;
        results = repairData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      case "recliners":
        const reclinersData = require("../helpers/helpers").recliners;
        results = reclinersData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      case "office":
        const officeData = require("../helpers/helpers").office;
        results = officeData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      case "beds":
        const bedsData = require("../helpers/helpers").beds;
        results = bedsData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      case "pillows":
        const pillowsData = require("../helpers/helpers").pillows;
        results = pillowsData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      case "antics":
        const anticsData = require("../helpers/helpers").antics;
        results = anticsData.filter(item => matchesSearch(item) && matchesPrice(item));
        break;
      default:
        results = [];
    }
    
    setFilteredResults(results);
  };

  // Render the appropriate section with filtered results if applicable
  const renderSection = () => {
    // If we have filtered results, we need to pass them to the components
    if (filteredResults) {
      switch (category) {
        case "ready":
          return <Ready customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        case "new":
          return <NewFurniture customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        case "repair":
          return <Repair customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        case "recliners":
          return <Recliners customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        case "office":
          return <Office customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        case "beds":
          return <Beds customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        case "pillows":
          return <Pillows customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        case "antics":
          return <Antics customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
        default:
          return <Ready customItems={filteredResults} searchTerm={searchTerm} priceRange={priceRange} />;
      }
    } else {
      // Regular rendering without filtered results
      switch (category) {
        case "ready":
          return <Ready />;
        case "new":
          return <NewFurniture />;
        case "repair":
          return <Repair />;
        case "recliners":
          return <Recliners />;
        case "office":
          return <Office />;
        case "beds":
          return <Beds />;
        case "pillows":
          return <Pillows />;
        case "antics":
          return <Antics />;
        default:
          return <Ready />; 
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-emerald-50 min-h-screen flex flex-col">
      {/* Search and Filter Component */}
      <SearchFilter 
        activeCategory={category} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {/* Search Results Summary */}
      {(searchTerm || priceRange.min || priceRange.max) && filteredResults && (
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
          <div className="bg-amber-100 rounded-full px-4 py-2 flex items-center">
            <SearchIcon className="text-emerald-700 mr-2" fontSize="small" />
            <span className="text-sm">
              Found <span className="font-bold">{filteredResults.length}</span> results
              {searchTerm && (
                <> for "<span className="font-bold text-emerald-700">{searchTerm}</span>"</>
              )}
            </span>
          </div>
          
          {/* Price Range Badge */}
          {(priceRange.min || priceRange.max) && (
            <div className="bg-emerald-100 rounded-full px-4 py-2 flex items-center">
              <AttachMoneyIcon className="text-amber-700 mr-2" fontSize="small" />
              <span className="text-sm">
                Price: 
                {priceRange.min && !priceRange.max && (
                  <span className="font-bold">KSH {priceRange.min}+</span>
                )}
                {!priceRange.min && priceRange.max && (
                  <span className="font-bold">Up to KSH {priceRange.max}</span>
                )}
                {priceRange.min && priceRange.max && (
                  <span className="font-bold">KSH {priceRange.min} - {priceRange.max}</span>
                )}
              </span>
            </div>
          )}
          
          {/* Clear Filters Button */}
          <button 
            onClick={() => {
              router.push(`/products?category=${category}`);
              setSearchTerm('');
              setPriceRange({ min: '', max: '' });
              setFilteredResults(null);
            }}
            className="bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-2 flex items-center text-sm transition-colors"
          >
            <CloseIcon className="mr-1" fontSize="small" />
            Clear filters
          </button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)} Furniture
          </h2>
          <p className="text-md text-gray-600 max-w-xl mx-auto">
            Browse our selection of quality {category} furniture pieces
          </p>
        </div>
        {renderSection()}
      </div>
    </div>
  );
}

export default Page;
