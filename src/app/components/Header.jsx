'use client'
import React, { useState, useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import KeyIcon from '@mui/icons-material/Key';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChairIcon from "@mui/icons-material/Chair";
import WeekendIcon from "@mui/icons-material/Weekend";
import BuildIcon from "@mui/icons-material/Build";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import BusinessIcon from "@mui/icons-material/Business";
import KingBedIcon from "@mui/icons-material/KingBed";
import PanoramaHorizontalIcon from "@mui/icons-material/PanoramaHorizontal";
import logo from "../../../public/logodawoodweb.png"; // Using existing logo file
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect for menu - Only run on client side
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // Prefetch all category pages for instant navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Prefetch common category pages
      const categories = ['ready', 'antics', 'new', 'repair', 'recliners', 'office', 'pillows', 'beds'];
      categories.forEach(category => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = `/products?category=${category}`;
        document.head.appendChild(link);
      });
    }
  }, []);
  
  const handleAdminClick = () => {
    router.push('../admin');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navigateToCategory = (category) => {
    // Close menu immediately before navigation
    setIsMenuOpen(false);
    
    // Use Next.js router with prefetch and replace options for faster navigation
    // without full page reload
    router.push(`/products?category=${category}`, undefined, { 
      scroll: false,  // Prevents automatic scrolling to top
      shallow: true   // Makes the transition faster by not re-fetching data
    });
  };
  return (
    <header className={`p-4 bg-gradient-to-b from-teal-100 to-teal-50 shadow-md sticky top-0 z-50 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Website Logo"
            width={80}
            height={80}
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
          <div className="flex flex-col cursor-pointer" onClick={() => router.push('/')}>
            <p className="text-lg lg:text-3xl font-extrabold tracking-widest">
              <span className="text-amber-800">ham</span><span className="text-emerald-700">Wood</span>
            </p>
            <h1 className="text-sm lg:text-lg font-light text-gray-600 tracking-wide">
              <span className="border-b border-amber-500">Premium Furniture Design</span>
            </h1>
          </div>
        </div>

        {/* Browse Products Button */}
        <div className="hidden lg:block">
          <button 
            onClick={() => router.push('/products')} 
            className="flex items-center bg-gradient-to-r from-amber-500 to-emerald-600 text-white rounded-full px-5 py-2 hover:shadow-lg transition-all"
          >
            <ShoppingBagIcon className="mr-2" />
            Browse Products
          </button>
        </div>

        {/* Call Us Button */}
        <div className="lg:flex items-center gap-0 hidden ">
          <button className="flex items-center justify-center bg-teal-500 text-white font-medium rounded-l-full px-3 py-2 hover:bg-teal-600 transition-all">
            <CallIcon className="w-5 h-5" />
          </button>
          <button className="bg-teal-500 text-white font-medium rounded-r-full px-4 py-2 hover:bg-teal-600 transition-all">
            <a href="tel:+254713593401" className="ml-1">
              Call Us
            </a>
          </button>
          <button className=" text-teal-900 underline font-medium rounded-full px-4 py-2 hover:bg-teal-600 hover:text-white hover:m-3 transition-all" onClick={handleAdminClick}>
              Admin
            
          </button>
        </div>

        {/* Responsive Buttons - Repositioned */}
        <div className="lg:hidden flex items-center gap-2 ml-auto order-last">
          <button 
            onClick={() => router.push('/products')} 
            className="flex items-center bg-gradient-to-r from-amber-500 to-emerald-600 text-white rounded-full px-3 py-1 hover:shadow-lg transition-all text-sm"
          >
            <ShoppingBagIcon className="mr-1" fontSize="small" />
            Products
          </button>
          <button className="text-teal-900 bg-gray-100 rounded-full p-2 hover:bg-teal-600 hover:text-white transition-all" onClick={handleAdminClick}>
            <KeyIcon fontSize="small" />
          </button>
          <button 
            onClick={toggleMenu} 
            className="text-emerald-700 bg-amber-100 rounded-full p-2 hover:bg-amber-500 hover:text-white transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </button>
        </div>
      </div>

      {/* Mobile Category Menu - Animated */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      ></div>
      <div 
        className={`lg:hidden fixed right-0 top-0 h-full w-64 max-w-[calc(100%-50px)] bg-gradient-to-b from-amber-50 to-teal-50 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-emerald-700">Categories</h2>
            <button 
              onClick={toggleMenu} 
              className="text-amber-600 hover:text-amber-800 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
          
          <div className="space-y-1">
            <Link 
              href="/products?category=ready"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <WeekendIcon className="mr-3 text-emerald-600" />
              <span className="font-medium">Ready</span>
            </Link>
            
            <Link 
              href="/products?category=antics"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <ChairAltIcon className="mr-3 text-amber-600" />
              <span className="font-medium">Antics</span>
            </Link>
            
            <Link 
              href="/products?category=new"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <ChairIcon className="mr-3 text-emerald-600" />
              <span className="font-medium">New</span>
            </Link>
            
            <Link 
              href="/products?category=repair"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <BuildIcon className="mr-3 text-amber-600" />
              <span className="font-medium">Repair</span>
            </Link>
            
            <Link 
              href="/products?category=recliners"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <WeekendIcon className="mr-3 text-emerald-600" />
              <span className="font-medium">Recliners</span>
            </Link>
            
            <Link 
              href="/products?category=office"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <BusinessIcon className="mr-3 text-amber-600" />
              <span className="font-medium">Office</span>
            </Link>
            
            <Link 
              href="/products?category=pillows"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <PanoramaHorizontalIcon className="mr-3 text-emerald-600" />
              <span className="font-medium">Pillows</span>
            </Link>
            
            <Link 
              href="/products?category=beds"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center p-3 rounded-lg text-left hover:bg-amber-100 transition-colors"
              prefetch={true}
            >
              <KingBedIcon className="mr-3 text-amber-600" />
              <span className="font-medium">Beds</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
