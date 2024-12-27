import React, { useState, useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, onClose }) => {
  const [scale, setScale] = useState(1); // State to control zoom scale

  // Close the modal when pressing 'Esc' key
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, onClose]);

  // Close the modal when clicking outside the modal content
  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id === 'modalOverlay') {
      onClose();
    }
  };

  const handleZoomIn = () => setScale(scale * 1.2); // Zoom in by 20%
  const handleZoomOut = () => setScale(scale / 1.2); // Zoom out by 20%

  if (!isOpen) return null;

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-pointer"
      onClick={handleOutsideClick} // Close the modal when clicking outside the modal
    >
      <div className="relative bg-white rounded-lg p-6 w-4/5 max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl bg-gray-700 rounded-full p-2"
        >
          &times;
        </button>

        {/* Image container */}
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt="Zoomed Image"
            className="transition-transform duration-300"
            style={{ transform: `scale(${scale})` }} // Apply the zoom scale
          />
        </div>

        {/* Zoom Controls */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleZoomIn}
            className="bg-blue-600 text-white p-2 rounded-full"
          >
            Zoom In
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-blue-600 text-white p-2 rounded-full"
          >
            Zoom Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
