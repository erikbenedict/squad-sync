import UserGroups from "../components/UserGroups";
import { useCurrentUserContext } from "../context/CurrentUser";

function Dashboard() {
  const { currentUser } = useCurrentUserContext();

  return (
    <div className="h-screen p-6 bg-slate-200 dark:bg-slate-800">
      <h1 className="mb-8 text-3xl font-semibold text-center md:text-left md:text-4xl 2xl:text-5xl 2xl:mt-8 dark:text-white">
        Welcome, {currentUser.firstName}!
      </h1>
      <div className="w-11/12 p-8 mx-auto bg-blue-400 rounded-xl 2xl:mt-20 h-fit dark:bg-slate-500">
        <div>
          <h1 className="text-2xl font-semibold text-center md:text-3xl 2xl:text-4xl dark:text-white">
            Your Groups
          </h1>
        </div>
        <UserGroups />
      </div>
    </div>
  );
}

export default Dashboard;
