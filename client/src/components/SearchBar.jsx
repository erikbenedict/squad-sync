import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_GROUPS } from "./../graphql/queries.js"; // Define your queries
import { useCurrentUserContext } from "../context/CurrentUser.jsx";

function TaskSearch() {
  const {currentUser}= useCurrentUserContext();
  const { loading, data } = useQuery(QUERY_USER_GROUPS, {
    variables: {userID: currentUser._id}
  });

  console.log('Data:', data);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleSearch = (keyword) => {
    if (!data) {
      return; // Data is not yet available, do not proceed
    }

    const newFilteredTasks = [];

    // Iterate through each group and its categories
    data.userGroups.forEach((group) => {
      console.log('Group:', group);

      group.categories.forEach((category) => {
        console.log('Category:', category);

        // Filter tasks for each category based on search keyword
        const filteredCategoryTasks = category.tasks.filter((task) =>
          task.taskName.includes(keyword)
        );
        // Add filtered tasks to the list
        newFilteredTasks.push(...filteredCategoryTasks);
      });
    });

    setFilteredTasks(newFilteredTasks);
  };

  const handleChange = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    handleSearch(keyword);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks"
        value={searchKeyword}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          console.log("Perform search for:", searchKeyword);
        }}
        className="block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Search
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task._id}>{task.taskName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskSearch;
