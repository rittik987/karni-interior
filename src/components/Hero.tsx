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
  const [startX, setStartX] = useState(0); // Tracks the starting point of the touch
  const [isSmallDevice, setIsSmallDevice] = useState(false); // Tracks screen size

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768); // Set breakpoint for small devices
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically change slides for larger devices
  useEffect(() => {
    if (isSmallDevice) return; // Disable auto-sliding on small devices

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length, isSmallDevice]);

  // Handle swipe start
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX); // Record the starting X position
  };

  // Handle swipe end
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX; // Record the ending X position
    const diffX = endX - startX; // Calculate the swipe distance

    if (diffX > 50) {
      // Swipe right
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else if (diffX < -50) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
