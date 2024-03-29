import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';
import DarkModeToggle from "./DarkModeToggle";
import { Collapse } from 'flowbite';

function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  const collapse = new Collapse({
    targetEl: document.getElementById('navbar-default'),
    triggerEl: document.getElementById('navbar-toggle-button'),
  }); 
  
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/128/11473/11473477.png" className="h-8 mr-3" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SquadSync</span>
        </Link>
       
        <button
          id="navbar-toggle-button"
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
          rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
          dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 
          md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 ">
            {isLoggedIn() ? (
              <>
                <li>
                  <Link to="/dashboard" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 
                  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white 
                  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                  md:dark:hover:bg-transparent">Dashboard</Link>
                </li>
                <li>
                  <button type="button" onClick={logoutUser} className="block py-2 pl-3 pr-4 text-gray-900 rounded 
                  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white 
                  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button>
                </li>
               
        <DarkModeToggle/>
        
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 
                  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white 
                  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                  md:dark:hover:bg-transparent">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100
                   md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white 
                   md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                   md:dark:hover:bg-transparent">Sign Up</Link>
                </li>
                <DarkModeToggle/>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;Header.jsx
