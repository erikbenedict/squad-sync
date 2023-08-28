import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_GROUP } from '../graphql/queries';
import Categories from '../components/Categories';

function GroupPage() {
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
        <Categories groupId={groupId} />
      </div>
    </div>
  );
}

export default GroupPage;
