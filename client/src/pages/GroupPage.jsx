import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_GROUP } from '../graphql/queries';
import SingleCategory from '../components/SingleCategory';

function GroupPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { groupId } = useParams();
  console.log('----> GROUP ID <----', groupId);
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { groupId },
  });
  const group = data?.getSingleGroup || {};
  console.log('-----> DATA <-----', data);
  console.log('-----> GROUP <-----', group);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="group-container">
      <header className="group-header">
        <h1 className="group-name">{group.groupName}</h1>
        <h2>Members:</h2>
        <ul className="member-list">
          {group.users.map((user) => (
            <li key={user._id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      </header>
      <div className="categories-container">
        <div className="category-list">
          <h2>Categories</h2>
          {group.categories.map((category) => (
            <div
              key={category._id}
              className="category-div"
              onClick={() => setSelectedCategory(category)}
            >
              <h3 className="category-name">{category.categoryName}</h3>
            </div>
          ))}
        </div>
        <div className="single-category-div">
          {
            selectedCategory ? (
              <SingleCategory category={selectedCategory} />
            ) : null /* add placeholder div */
          }
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
