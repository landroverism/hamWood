import React from 'react'
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import logo from "../../../public/logodawoodweb.png"; // Using existing logo file
import Image from "next/image";
function Footer() {
  return (
    <div className="py-10  bg-gradient-to-l from-teal-50 to-teal-100 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-2  justify-between items-center px-3 gap-4 ">
 <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Website Logo"
            width={80}
            height={80}
            // className="rounded-full border-2 border-teal-400 shadow-md hover:shadow-lg transition-all"
          />
          <div className="flex flex-col">
            <p className="text-lg lg:text-3xl font-extrabold tracking-widest">
              <span className="text-amber-800">ham</span><span className="text-emerald-700">Wood</span>
            </p>
            <h1 className="text-sm lg:text-lg font-light text-gray-600 tracking-wide">
              <span className="border-b border-amber-500">Premium Furniture Design</span>
            </h1>
          </div>
        </div>    
        <div className="mt-10 flex flex-col items-center justify-center">
        <h5 className='underline font-semibold text-teal-950'>Contacts</h5>

      <div className="flex md:flex  gap-4 mt-2 flex-wrap ">
    <a
      href="tel:+254713593401"
      className="flex items-center border-2 text-teal-600 border-teal-200 px-2 py-1 rounded-full hover:bg-gray-800"
    >
      <CallIcon fontSize="small" className="mr-2" />
      +254 713 593401
    </a>
    <a
      href="https://wa.me/+254713593401"
      className="flex items-center border-2 text-green-600 border-green-200 px-1 py-1 rounded-full hover:bg-green-600 hover:text-white"
    >
      <WhatsAppIcon fontSize="small" className="mr-2" />
      WhatsApp Us
    </a>
    <a
      href="mailto:hamsimotwo@gmail.com"
      className="flex items-center  border-2 text-teal-600 border-teal-200 px-2 py-1 rounded-full hover:bg-slate-900 hover:text-slate-50"
    >
      <EmailIcon fontSize="small" className="mr-2" />
      Email Us
    </a>
  </div>
  <h4 className='mt-5 font-semibold text-teal-950'>Located at Syokimau, Nairobi</h4>
  </div></div>
  )
}

export default Footer