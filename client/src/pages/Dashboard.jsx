import UserGroups from '../components/UserGroups';
import { useCurrentUserContext } from '../context/CurrentUser';

function Dashboard() {
  const { currentUser } = useCurrentUserContext();

  return (
    <div className="w-3/4 h-screen p-2 mx-auto bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-gray-400 rounded-md shadow-md lg:my-20 dark:bg-gray-600">
        <h1 className="mb-8 text-3xl font-semibold text-center md:text-left md:text-4xl xl:text-6xl 2xl:mt-8 dark:text-white">
          Welcome, {currentUser.firstName}!
        </h1>
        <div className="w-11/12 p-8 mx-auto bg-gray-100 border-8 rounded-md dark:bg-gray-400 2xl:mt-10 h-fit">
          <div>
            <h1 className="text-2xl font-semibold text-center md:text-3xl xl:text-4xl dark:text-white">
              Your Groups
            </h1>
          </div>
          <UserGroups />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
