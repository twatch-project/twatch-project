import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[]; // List of image URLs
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleImageChange = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  return (
    <div className="flex flex-col  w-1/2 items-center mt-4">
      <img src={mainImage} alt="Main" className="bg-cover h-96 rounded-lg mb-4" />
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(image)}
            className={`w-24 h-20 rounded-lg border ${mainImage === image ? 'border-blue-500' : 'border-gray-400'}`}
          >
            <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg " />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;