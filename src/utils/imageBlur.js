import React, { useState } from 'react';

const ImagePreview = ({ imageUrl }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleClick = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt="Preview"
        onClick={handleClick}
        className={`image-thumbnail ${showPreview ? 'active' : ''}`}
      />

      {showPreview && (
        <div className="image-modal" onClick={handleClick}>
          <img src={imageUrl} alt="Full Size" className="full-size-image" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
