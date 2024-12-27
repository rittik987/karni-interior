'use client';

import React from 'react';

const Founder: React.FC = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg border-4 border-blue-500">
            <img
              src="/images/founder.jpg"
              alt="Founder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">About Our Founder</h2>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-semibold text-blue-800">[Your Name]</span>, the visionary leader and founder of this company, has dedicated their life to crafting innovative and transformative designs. With a background in <em>[mention relevant field]</em> and over <strong>[X years]</strong> of experience, they have redefined the standards of excellence in the industry.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Their journey began with a simple belief: <q>Great design is not just about aesthetics; it’s about creating spaces that tell stories and inspire people.</q> This philosophy has guided every project, ensuring each space is unique, functional, and truly exceptional.
          </p>
          <p className="text-lg text-gray-700">
            When not designing, <span className="font-semibold text-blue-800">[Your Name]</span> enjoys <em>[mention hobbies or interests]</em>, which further fuels their creativity and passion for innovation. Their commitment to excellence and personalized approach has earned the trust and admiration of clients worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Founder;