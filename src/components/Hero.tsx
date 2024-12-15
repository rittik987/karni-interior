"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const HeroCarousel = () => {
  const images = [
    "/images/image1.jpg", // Stored in the public/images folder
    "/images/image2.jpg",
    "/images/image3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-[500px] flex-shrink-0 relative"
          >
            <Image
              src={image}
              alt={`Carousel Image ${index + 1}`}
              layout="fill" // Ensures the image covers the div completely
              objectFit="cover" // Crop and fill the space appropriately
              priority={index === 0} // Load the first image eagerly
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      {/* Optional Navigation Controls */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          )
        }
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
      >
        &#8250;
      </button>
    </div>
  );
};

export default HeroCarousel;
