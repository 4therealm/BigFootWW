// components/ImageUploader.js
import React, { useRef } from 'react';

const ImageUploader = ({ productId }) => {
  const fileInputRef = useRef();

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      await uploadImage(file, productId);
    }
  };

  const uploadImage = async (file, productId) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`/api/product/upload/641a4b2d59212a40b42c52ee`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
      } else {
        throw new Error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <button
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
