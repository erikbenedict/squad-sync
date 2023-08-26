import React, { useState } from 'react';
import { Carousel } from "flowbite-react";

const Landing = () => {
  const [showCarousel, setShowCarousel] = useState(false);

  const handleCarouselButtonClick = () => {
    setShowCarousel(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to our App</h1>
        <p className="text-gray-600 mb-8">
          This is a landing page for our awesome app.
        </p>
        <button
          className="btn btn-primary px-6 py-3 rounded-lg"
          onClick={handleCarouselButtonClick}
        >
          Get More Info
        </button>
      </div>
      
      {showCarousel && (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {/* Item 1 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src="/picture/222.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div>
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          </div>

          {/* Slider controls */}
          <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
