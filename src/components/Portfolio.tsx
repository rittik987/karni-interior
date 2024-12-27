'use client';

import React from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  thumbnail: string;
  images: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Modern Living Room',
    thumbnail: '/images/img12.jpg',
    images: [
      '/images/img12.jpg',
      '/images/img12.jpg',
      '/images/img12.jpg',
    ],
  },
  {
    id: 2,
    name: 'Cozy Bedroom Design',
    thumbnail: '/images/bedroom-thumbnail.jpg',
    images: [
      '/images/img12.jpg',
      '/images/img12.jpg',
      '/images/img12.jpg',
    ],
  },
  {
    id: 3,
    name: 'Elegant Office Space',
    thumbnail: '/images/office-thumbnail.jpg',
    images: [
      '/images/office.jpg',
      '/images/office.jpg',
      '/images/office.jpg',
    ],
  },
  {
    id: 4,
    name: 'Modern Living Room',
    thumbnail: '/images/img12.jpg',
    images: [
      '/images/img12.jpg',
      '/images/img12.jpg',
      '/images/img12.jpg',
    ],
  },
  {
    id: 5,
    name: 'Cozy Bedroom Design',
    thumbnail: '/images/bedroom-thumbnail.jpg',
    images: [
      '/images/img12.jpg',
      '/images/img12.jpg',
      '/images/img12.jpg',
    ],
  },
  {
    id: 6,
    name: 'Elegant Office Space',
    thumbnail: '/images/office-thumbnail.jpg',
    images: [
      '/images/office.jpg',
      '/images/office.jpg',
      '/images/office.jpg',
    ],
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header and Slogan */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Portfolio</h2>
          <p className="text-lg text-gray-600">
            Explore our stunning projects that blend creativity and functionality.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {/* Project Thumbnail */}
              <Link href={`/portfolio/${project.id}`}>
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>

              {/* Project Name */}
              <div className="p-4 text-center">
                <Link href={`/portfolio/${project.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                    {project.name}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;