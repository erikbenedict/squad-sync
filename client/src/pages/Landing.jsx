import React, { useState } from "react";
import { Carousel } from "flowbite-react";

const Landing = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCarouselButtonClick = () => {
    setShowCarousel(true);
  };

  const handleBackButtonClick = () => {
    setShowCarousel(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {!showCarousel ? (
        <div className="bg-white p-2 w-45 md:p-16 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-600 max-w-screen-sm mx-auto" style={{ maxWidth: '100vw' }}>
          <h1 className="text-4xl font-semibold mb-4 text-gray-800 dark:text-black text-center">
            Welcome to SquadSync
          </h1>
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-400">
            <div className="max-w-md mx-auto text-center">
              <p className="mb-8 text-gray-600">
                Join us to connect, collaborate, and create amazing things
                together.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="btn btn-primary px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                  onClick={handleCarouselButtonClick}
                >
                  Learn More
                </button>
            
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-screen-lg mx-auto">
          <Carousel>
            {/* Placeholder slide 1 */}
            <div
              className="relative h-96 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg')`,
              }}
              data-carousel-item
            >
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-8">
                <h2 className="text-2xl font-bold mb-2">Slide 1</h2>
                <p className="text-gray-300">
                  Discover the beauty of nature with our app.
                </p>
              </div>
            </div>

            {/* Placeholder slide 2 */}
            <div
              className="relative h-96 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg')`,
              }}
              data-carousel-item
            >
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-8">
                <h2 className="text-2xl font-bold mb-2">Slide 2</h2>
                <p className="text-gray-300">
                  Experience new adventures with our app.
                </p>
              </div>
            </div>

            {/* Add more placeholder slides here */}
          </Carousel>
          <button
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-40 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={handleBackButtonClick}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
