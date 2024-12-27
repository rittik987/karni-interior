'use client';

import React, { useState } from 'react';

const ProjectUpload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setThumbnail(event.target.files[0]);
    }
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear previous errors or messages
    setMessage('');
    setError(null);

    if (!title || !description || !thumbnail) {
      setError('Please fill out all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);

    images.forEach((image) => {
      formData.append('images', image);
    });

    setLoading(true);
    setMessage('Uploading your project...');

    try {
      const response = await fetch('/api/portfolio/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.error || 'Something went wrong'}`);
        console.error('API Error:', errorData);
      } else {
        const data = await response.json();
        setMessage('Project uploaded successfully!');
        console.log('Uploaded Project:', data);

        // Reset the form
        setTitle('');
        setDescription('');
        setThumbnail(null);
        setImages([]);
      }
    } catch (error) {
      setError('An error occurred during the upload process.');
      console.error('Upload Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl text-green-700 font-bold mb-4">Upload a New Project</h2>

      {/* Show messages or errors */}
      {message && <p className="mb-4 text-green-500">{message}</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md"
            rows={5}
            required
          />
        </div>

        {/* Thumbnail Image */}
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-700 font-medium mb-2">
            Thumbnail Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="block w-full text-gray-700"
            required
          />
          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail Preview"
              className="mt-2 h-32 w-auto object-cover"
            />
          )}
        </div>

        {/* Additional Images */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 font-medium mb-2">
            Additional Images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="block w-full text-gray-700"
          />
          {images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Uploading...' : 'Upload Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectUpload;
