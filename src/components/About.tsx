'use client';

import React from 'react';

const AboutHeader: React.FC = () => {
  return (
    <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/office.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-4xl">
          Discover the story behind our journey and the passion that drives us to create exceptional experiences for our clients.
        </p>
      </div>
    </div>
  );
};

export default AboutHeader;