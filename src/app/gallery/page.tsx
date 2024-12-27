// app/gallery/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ImageModal from '@/components/ImageModal'; // Import the modal component

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) {
          throw new Error('Failed to fetch images');
        }
        const data: string[] = await res.json();
        setImages(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="text-center py-16">Loading gallery...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-16">{error}</div>;
  }

  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Gallery Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Gallery</h2>
          <p className="text-lg text-gray-600">
            Browse through all the stunning images from our portfolio projects.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => handleImageClick(image)} // Open modal on image click
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Image Zooming */}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          imageUrl={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GalleryPage;
