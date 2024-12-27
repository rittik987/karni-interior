'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  title: string;
  thumbnail: string;
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/portfolio/fetch');
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Delete project by ID
  const deleteProject = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/portfolio/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      // Remove the deleted project from the state
      setProjects(projects.filter((project) => project.id !== id));
      alert('Project deleted successfully');
    } catch (err: any) {
      alert(`Error deleting project: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-gray-600">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-16">{error}</div>;
  }

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Manage Projects</h2>
          <p className="mt-4 text-lg text-gray-600">
            View, select, and delete projects from the list below.
          </p>
        </div>

        {/* Project Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Thumbnail</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Title</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{project.title}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
