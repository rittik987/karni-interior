'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Service {
  id: number;
  name: string;
  image: string;
}

const services: Service[] = [
  { id: 1, name: 'Interior Design', image: '/images/service3.png' },
  { id: 2, name: 'Furniture Design', image: '/images/service1.png' },
  { id: 3, name: 'Space Planning', image: '/images/service2.png' },
  { id: 4, name: 'Lighting Design', image: '/images/service4.png' },
  { id: 5, name: 'Custom Artwork', image: '/images/service5.png' },
];

const Service: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    // Check the screen size
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    updateScreenSize(); // Initial check
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isLargeScreen) return;

    let animationFrame: number;
    let scrollAmount = 0;

    const animateScroll = () => {
      scrollAmount += 1;
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0; // Reset scroll to create a seamless loop
      }
      container.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(animateScroll);
    };

    animationFrame = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isLargeScreen]);

  return (
    <div className="w-full py-16 bg-gray-200">
      {/* Left Section */}
      <div className="md:flex-row lg:flex items-center md:items-start justify-between max-w-7xl mx-auto px-8">
        <div className="md:w-1/3 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 hover:text-yellow-500 transition duration-300">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Transforming spaces with elegance and functionality.
          </p>
        </div>

        {/* Right Section */}
        <div
          ref={scrollContainerRef}
          className={`relative md:w-2/3 ${
            isLargeScreen ? 'overflow-hidden' : 'overflow-x-scroll'
          } whitespace-nowrap`}
        >
          <div className="flex">
            {/* Render duplicated services only for large screens */}
            {(isLargeScreen ? [...services, ...services] : services).map(
              (service, index) => (
                <div
                  key={index}
                  className="group flex-shrink-0 w-48 flex flex-col items-center text-center bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-slate-500 mx-4"
                >
                  {/* Service Image */}
                  <div className="relative w-48 h-32 rounded-md overflow-hidden p-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Service Name */}
                  <div className="mt-4 text-gray-800 group-hover:text-white font-medium py-2 px-4">
                    {service.name}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
