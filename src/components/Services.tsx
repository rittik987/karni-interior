'use client';

import React from 'react';

interface Service {
  id: number;
  name: string;
  image: string;
}

const services: Service[] = [
  { id: 1, name: 'Interior Design', image: '/images/img.jpg' },
  { id: 2, name: 'Furniture Design', image: '/images/img.jpg' },
  { id: 3, name: 'Space Planning', image: '/images/img.jpg' },
  { id: 4, name: 'Lighting Design', image: '/images/img.jpg' },
  { id: 5, name: 'Custom Artwork', image: '/images/img.jpg' },
];

const Service: React.FC = () => {
  return (
    <div className="w-full py-16 bg-gray-200">
      {/* Left Section */}
      <div className=" md:flex-row lg:flex items-center md:items-start justify-between max-w-7xl mx-auto px-8">
        <div className=" md:w-1/3 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 hover:text-yellow-500 transition duration-300">Our Services</h2>
          <p className="text-lg text-gray-600">
            Transforming spaces with elegance and functionality.
          </p>
        </div>

        {/* Right Section */}
        <div className="relative md:w-2/3 overflow-hidden">
          <div className="flex animate-step-scroll">
            {services.map((service, index) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling Animation */}
      <style jsx>{`
        .animate-step-scroll {
          display: flex;
          animation: step-scroll 10s infinite;
        }

        @keyframes step-scroll {
          0% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-20%);
          }
          30% {
            transform: translateX(-20%);
          }
          40% {
            transform: translateX(-40%);
          }
          60% {
            transform: translateX(-40%);
          }
          70% {
            transform: translateX(-60%);
          }
          90% {
            transform: translateX(-60%);
          }
          100% {
            transform: translateX(-80%);
          }
        }
      `}</style>
    </div>
  );
};

export default Service;    