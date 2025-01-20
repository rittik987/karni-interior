'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  name: string;
  image: string;
  link: string;
}

const projects: Project[] = [
    { id: 1, name: 'Modern Living Room', image: '/images/service1.png', link: '/portfolio' },
    { id: 2, name: 'Elegant Bedroom', image: '/images/service4.png', link: '/portfolio' },
    { id: 3, name: 'Luxury Kitchen', image: '/images/image2.jpg', link: '/portfolio' },
    { id: 4, name: 'Stylish Office', image: '/images/image3.jpg', link: '/portfolio' },
  ];

const Portfolio: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (link: string) => {
    router.push(link);
  };

  const handleSeeMore = () => {
    router.push('/portfolio'); // Navigate to the main portfolio page
  };

  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Portfolio</h2>

        {/* Slogan */}
        <p className="text-lg text-gray-600 mb-12">
          Showcasing our finest projects that blend creativity and functionality.
        </p>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleNavigation(project.link)}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Project Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 font-medium text-lg transition-opacity duration-300 group-hover:opacity-90">
                {project.name}
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-12">
          <button
            onClick={handleSeeMore}
            className="px-6 py-3 bg-gray-800 text-white font-medium text-lg rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;