import { useState } from 'react';
import { Carousel } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [showCarousel, setShowCarousel] = useState(false);

  const handleCarouselButtonClick = () => {
    setShowCarousel(true);
  };

  const handleBackButtonClick = () => {
    setShowCarousel(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {!showCarousel ? (
        <div
          className="bg-gray-400 p-2 w-45 md:p-16 rounded-lg shadow-lg dark:bg-gray-600 max-w-screen-sm mx-auto"
          style={{ maxWidth: '100vw' }}
        >
          <h1 className="text-4xl font-semibold mb-4 text-gray-800 dark:text-black text-center">
            Welcome to SquadSync
          </h1>
          <div className="p-6 md:p-10 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-400">
            <div className="max-w-md mx-auto text-center">
              <p className="mb-8 text-gray-700 text-lg leading-relaxed">
                Your <span className="font-semibold">ultimate solution</span>{' '}
                for seamless{' '}
                <span className="font-semibold">team collaboration</span> and
                efficient{' '}
                <span className="font-semibold">task management </span>.
                <br />
                <br />
                Say goodbye to scattered tasks and disjointed communication.
                <br />
                <br />
                Say hello to a new era of{' '}
                <span className="font-semibold">productivity</span>.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="btn btn-primary px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn btn-primary px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                  <Link to="/register">Register</Link>
                </button>
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
        <div className="relative w-full max-w-screen-md mx-auto">
          <Carousel slideInterval={15000000}>
            <div
              className="relative h-96 bg-cover bg-center rounded-lg"
              data-carousel-item
            >
              <div
                className="absolute inset-0 flex flex-col justify-between text-white bg-black bg-opacity-50 p-8"
                style={{
                  backgroundImage: `url('https://img.freepik.com/premium-vector/pencil-sheet-paper-vector-illustration_525134-35.jpg')`,
                  backgroundPosition: `center calc(50% - 60px)`,
                }}
              >
                <div className="text-left mt-5 mr-4">
                  <h2 className="text-2xl text-gray-900 font-bold mb-2">
                    Revolutionizing<br></br> Team Collaboration <br></br>and
                    Task Management
                  </h2>
                </div>
                <div className="text-base text-black overflow-auto">
                  {/* Add a scrollable container for the text */}
                  <p>
                    SquadSync, a cutting-edge task management application,
                    redefines the way teams collaborate and organize their
                    projects. Inspired by the concept of a &quot;HoneyDo&quot;
                    list, SquadSync empowers users to create and manage tasks,
                    all within a seamless and unified platform.
                    {/* Continue your text content */}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative h-96 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url('https://st4.depositphotos.com/18186852/40791/i/450/depositphotos_407914094-stock-photo-bright-colored-sticky-notes-blue.jpg')`,
              }}
              data-carousel-item
            >
              <div className="absolute inset-0 flex flex-col justify-between text-white bg-black bg-opacity-50 p-8">
                <div className="text-center ">
                  <h2 className="text-3xl text-gray-900 font-bold mb-2">
                    How to Use SquadSync
                  </h2>
                </div>
                <div className="text-base text-black overflow-auto font-semibold">
                  <div className="text-gray-900 text-bold">
                    Getting started with SquadSync is easy! Follow these simple
                    steps to harness the power of collaborative task management:
                    <ol className="list-decimal ml-6 mt-3">
                      <li>
                        <Link
                          to="/register"
                          className="text-blue-500 hover:underline"
                        >
                          Create an Account here:
                        </Link>{' '}
                        Sign up for SquadSync using your email and password.
                      </li>
                      <li>
                        Create a group: Start by creating a new group and give
                        it a name.
                      </li>
                      <li>
                        Create a category: Create categories for the group to
                        keep tasks organized
                      </li>
                      <li>
                        Add Tasks: Add tasks to your groups task list specifying
                        details, due date, and priority.
                      </li>
                      <li>
                        Add Collaborators: Add team members to join your group
                        and contribute to tasks.
                      </li>
                      <li>
                        Collaborate Effortlessly: Team members can add, update,
                        and complete tasks in real time.
                      </li>
                      <li>
                        Track Progress: Monitor task completion, set due dates,
                        and keep everyone informed.
                      </li>
                      <li>
                        Achieve Success: Work together seamlessly and achieve
                        project success with SquadSync!
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
          <button
            className="absolute top-3 left-9 transform -translate-x-1/2 z-40 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
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
