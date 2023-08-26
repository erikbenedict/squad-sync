// DarkModeToggle.js
import React, { useEffect } from 'react';

const DarkModeToggle = () => {
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 dark:bg-gray-900">
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleDarkMode}
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >Toggle Dark Mode
    </button>
    </div>
  );
};

export default DarkModeToggle;
