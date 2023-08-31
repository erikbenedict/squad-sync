import React from "react";
import TaskSearch from "../components/SearchBar"; // Update the import path

function Dashboard() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <TaskSearch />
    </div>
  );
}

export default Dashboard