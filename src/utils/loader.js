import React from 'react';
import '../css/loader.css'; // Import the CSS file

const Loader = () => {
  return (
    <div className="loader-container" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background:"transparent",
      backdropFilter: 'blur(10px)'
    }}>
      <div className="loader">
        <div className="loader-inner"></div>
      </div>
    </div>
    
  );
};

export default Loader;
