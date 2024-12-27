'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams(); // Retrieve the project ID from the route
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch project details by ID
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/portfolio/fetch?id=${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch project details');
        }
        const data: Project = await res.json();
        setProject(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-16">Loading project details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-16">{error}</div>;
  }

  if (!project) {
    return <div className="text-center py-16">Project not found</div>;
  }

  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Project Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{project.title}</h1>
          <p className="text-gray-600 text-sm mt-2">
            Created on: {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Project Description */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </div>

        {/* Project Images */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={image}
                  alt={`Project Image ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
