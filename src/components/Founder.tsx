'use client';

import React from 'react';

const Founder: React.FC = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg border-4 border-gray-500">
            <img
              src="/images/founder.png"
              alt="Founder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">About Our Founder</h2>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-semibold text-blue-800">Ashok Kumar</span>, the founder of Karni Interiors, started this company with a passion for creating beautiful and functional spaces. Before starting his own venture, he worked for others, gaining valuable experience in the interior design industry.
          </p>
          <p className="text-lg text-gray-700 mb-6">
          With over 15 years of experience, He believes that great design isn’t just about looks – it’s about making spaces that tell stories and inspire. This belief is the foundation of every project at Karni Interiors.
          </p>
          <p className="text-lg text-gray-700">
          When he’s not designing, He enjoys activities that spark his creativity and keep him inspired. His dedication and personal touch have earned the trust and appreciation of clients worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Founder;