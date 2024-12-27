'use client';

import React from 'react';
import { FaStar, FaHandshake, FaLightbulb, FaTools } from 'react-icons/fa';

const reasons = [
  {
    id: 1,
    icon: <FaStar className="text-4xl text-yellow-500" />,
    title: 'Expert Designers',
    description: 'Our team consists of highly skilled professionals with years of experience.',
  },
  {
    id: 2,
    icon: <FaHandshake className="text-4xl text-blue-500" />,
    title: 'Client-Centric Approach',
    description: 'We prioritize your vision and ensure every detail is tailored to your needs.',
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-4xl text-green-500" />,
    title: 'Innovative Solutions',
    description: 'We bring creativity and innovation to transform your space into a masterpiece.',
  },
  {
    id: 4,
    icon: <FaTools className="text-4xl text-red-500" />,
    title: 'Quality Assurance',
    description: 'We use premium materials and ensure the highest standards in our work.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-12">
          Discover what sets us apart and why our clients trust us with their spaces.
        </p>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:scale-105"
            >
              {/* Icon */}
              <div className="mb-4">{reason.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{reason.title}</h3>

              {/* Description */}
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;