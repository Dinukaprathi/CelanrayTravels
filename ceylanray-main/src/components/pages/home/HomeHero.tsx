"use client";
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const HomeHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Simplified images with better compression
  const images = [
    {
      url: 'https://wallpapers.com/images/hd/sri-lanka-mountain-puna-falls-ytqkj83xr4svce13.jpg?auto=compress&w=800&h=600&fit=crop',
      alt: 'Sri Lanka Mountains'
    },
  ];

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simplified slideshow - only on client
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000); // Much longer interval for better performance

    return () => clearInterval(interval);
  }, [images.length, isClient]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images - Simplified */}
      <div className="absolute inset-0">
        {isClient && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${images[currentImageIndex].url}')`,
            }}
          />
        )}
        
        {/* Fallback for server-side rendering */}
        {!isClient && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${images[0].url}')`,
            }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="text-center">
          {/* Main Content */}
          <div className="text-white">
            <div className="mb-4">
              <span className="text-sm font-medium tracking-wider uppercase text-blue-200">
                GLOBALLY CONNECTED
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Sri Lanka
              <span className="block text-blue-400">Your Way</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white mb-8 leading-relaxed max-w-4xl mx-auto">
              From dream to destination - Your complete travel companion for flights, hotels, and curated holiday packages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explore Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-5 h-5" />
                Watch Video
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Slideshow Indicators */}
      {isClient && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeHero;