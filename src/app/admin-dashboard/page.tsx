'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
const AdminDashboard: React.FC = () => {
  const router = useRouter();

  const handleAddProject = () => {
    router.push('/admin-dashboard/addproject');
  };

  const handleDeleteProject = () => {
    router.push('/admin-dashboard/deleteproject');
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="mt-4 text-lg text-gray-600">
            Manage your projects with ease. Add new projects or delete existing ones.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Add Project Button */}
          <div
            onClick={handleAddProject}
            className="group cursor-pointer bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Add Project
            </h3>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Click here to create and add a new project to your portfolio.
            </p>
          </div>

          {/* Delete Project Button */}
          <div
            onClick={handleDeleteProject}
            className="group cursor-pointer bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-7 7-7-7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-red-600">
              Delete Project
            </h3>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Click here to remove a project from your portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
