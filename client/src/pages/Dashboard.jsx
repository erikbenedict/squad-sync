import UserGroups from "../components/UserGroups";
import { useCurrentUserContext } from "../context/CurrentUser";

function Dashboard() {
  const { currentUser } = useCurrentUserContext();

  return (
    <div className="h-screen p-6 bg-green-400">
      <h1 className="mb-8 text-xl lg:text-4xl">
        Welcome, {currentUser.firstName}!
      </h1>
      <div className="p-8 bg-green-100 h-fit md:container md:mx-auto">
        <div>
          <h1 className="text-3xl text-center">Your Groups</h1>
        </div>
        <UserGroups />
      </div>
    </div>
  );
}

export default Dashboard;
