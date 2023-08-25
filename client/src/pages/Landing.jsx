import React, { useState } from 'react';

const Landing = () => {
  const [showCarousel, setShowCarousel] = useState(false);

  const handleCarouselButtonClick = () => {
    setShowCarousel(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-6xl font-semibold mb-4">Welcome to My App</h1>
        <p className="text-gray-600 mb-4">
          This is a landing page for my awesome app.
        </p>
        <button className="btn btn-primary" onClick={handleCarouselButtonClick}>
          Get More Info
        </button>
      </div>
      {showCarousel && (
        <div className="relative w-full" data-carousel="slide">
          {/* ... Carousel items here */}
        </div>
      )}
    </div>

    
  );
};

export default Landing;
