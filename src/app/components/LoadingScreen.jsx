import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can adjust the timeout as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-amber-50 to-emerald-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 relative mb-4">
          <Image 
            src="/favicon-32x32.png" 
            alt="hamWood Logo" 
            width={96} 
            height={96} 
            className="animate-pulse"
          />
        </div>
        <div className="text-3xl font-extrabold tracking-widest">
          <span className="text-amber-800">ham</span>
          <span className="text-emerald-700">Wood</span>
        </div>
        <p className="mt-2 text-gray-600">
          <span className="border-b border-amber-500">Premium Furniture Design</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
