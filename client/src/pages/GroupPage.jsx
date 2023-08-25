import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_GROUP } from '../graphql/queries'
import { QUERY_SINGLE_CATEGORY } from '../graphql/queries';
import SingleCategory from '../components/SingleCategory'
import React, { useState } from 'react';


function GroupPage () {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { groupId } = useParams()
  const { loading, error, data } = useQuery(QUERY_SINGLE_GROUP, { variables: { groupId } })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const group = data.getSingleGroup;

  return (
    <div className='group-container'>
      <header className='group-header'>
        <h1 className='group-name'>{group.groupName}</h1>
        <h2>Members:</h2>
        <ul className='member-list'>
        {group.users.map(user => (
          <li key={user._id}>{user.firstName} {user.lastName}</li>
        ))}
        </ul>
      </header>
      <div className='categories-container'>
        <div className='category-list'>
          <h2>Categories:</h2>
          {group.categories.map(category => (
            <div key={category._id} className='category-div' onClick={() => setSelectedCategory(category)}>
            <h3 className='category-name
            '>{category.categoryName}</h3>
            </div>
          ))}
        </div>
        <div className='single-category-div'>
        {selectedCategory && <SingleCategory category={selectedCategory} />}
        </div>
      </div>
    </div>
  )

}

export default GroupPage
