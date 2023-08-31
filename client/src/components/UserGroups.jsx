import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { Card, Button, Label, Modal, TextInput } from "flowbite-react";
import { QUERY_USER_GROUPS } from "../graphql/queries";
import { ADD_GROUP } from "../graphql/mutations";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../context/CurrentUser";

function UserGroups() {
  const { currentUser } = useCurrentUserContext();
  const { loading, error, data } = useQuery(QUERY_USER_GROUPS, {
    variables: { userId: currentUser._id },
    onError: (err) => {
      console.error("Error fetching groups:", err);
    },
  });

  const userGroups = data?.getUserGroups || [];

  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };

  const [addGroup, { error: mutationError }] = useMutation(ADD_GROUP, {
    refetchQueries: [
      { query: QUERY_USER_GROUPS, variables: { userId: currentUser._id } },
    ],
  });

  const handleGroupFormSubmit = async (event) => {
    event.preventDefault();

    const groupName = event.target.groupName.value;

    try {
      await addGroup({
        variables: {
          userId: currentUser._id,
          groupName: groupName,
        },
      });
      setOpenModal(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There has been an error, please try again.</p>;
  if (mutationError) return <p>Error creating group, please try again.</p>;

  return (
    <>
      <div className="grid grid-cols-1 gap-10 mt-10 mb-10 place-content-stretch md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:mt-20 2xl:mb-20">
        {userGroups.map((group) => (
          <Link key={group._id} to={`/group/${group._id}`}>
            <Card className="transition duration-500 ease-in-out transform border-4 border-indigo-900 border-double shadow-2xl hover:bg-white bg-slate-300 hover:-translate-y-1 hover:scale-110">
              <h5 className="flex items-center justify-center flex-grow text-lg font-bold tracking-tight text-gray-900 md:text-xl xl:text-2xl 2xl:text-3xl dark:text-white">
                <p>♣{group.groupName}</p>
              </h5>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <Button
          onClick={() => props.setOpenModal("form-elements")}
          color="dark"
        >
          <i className="pr-1 fa-solid fa-plus"></i>✚ Create Group
        </Button>
        <Modal
          show={props.openModal === "form-elements"}
          size="md"
          popup
          onClose={() => props.setOpenModal(undefined)}
        >
          <Modal.Header />
          <Modal.Body>
            <form className="space-y-6" onSubmit={handleGroupFormSubmit}>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create a new group
              </h3>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="groupName" value="Group Name" />
                </div>
                <TextInput
                  id="groupName"
                  placeholder="Enter the name for the group"
                  required
                />
              </div>
              <div className="w-full">
                <Button type="submit" color="dark">
                  Create Group!
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default UserGroups;
