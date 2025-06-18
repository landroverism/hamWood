'use client'
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import KeyIcon from '@mui/icons-material/Key';
import Search from "./Search";
import logo from "../../../public/logodawoodweb.png"; // Using existing logo file
import Image from "next/image";
import { useRouter } from "next/navigation";
function Header() {
  const router=useRouter()
  const handleAdminClick=()=>{
    router.push('../admin')
  }
  return (
    <header className="p-4 bg-gradient-to-b from-teal-100 to-teal-50 shadow-md ">
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

        {/* Search Bar */}
        <div className="hidden lg:block w-1/3">
          <Search />
        </div>

        {/* Call Us Button */}
        <div className="lg:flex items-center gap-0 hidden ">
          <button className="flex items-center justify-center bg-teal-500 text-white font-medium rounded-l-full px-3 py-2 hover:bg-teal-600 transition-all">
            <CallIcon className="w-5 h-5" />
          </button>
          <button className="bg-teal-500 text-white font-medium rounded-r-full px-4 py-2 hover:bg-teal-600 transition-all">
            <a href="tel:+254710434297" className="ml-1">
              Call Us
            </a>
          </button>
          <button className=" text-teal-900 underline font-medium rounded-full px-4 py-2 hover:bg-teal-600 hover:text-white hover:m-3 transition-all" onClick={handleAdminClick}>
              Admin
            
          </button>
        </div>

        {/* Responsive Search Bar */}
        <div className=" lg:hidden flex">
          <Search />
          <button className=" text-teal-900 underline font-medium rounded-full px-4 py-2 hover:bg-teal-600 hover:text-white hover:m-3 transition-all" onClick={handleAdminClick}>
              <KeyIcon/>
            
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
