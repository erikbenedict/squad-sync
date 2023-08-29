import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { Card, Button, Label, Modal, TextInput } from "flowbite-react";
import { QUERY_USER_GROUPS } from "../graphql/queries";
import { ADD_GROUP } from "../graphql/mutations";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../context/CurrentUser";

function UserGroups() {
  const { currentUser } = useCurrentUserContext();
  console.log(currentUser._id);
  const { loading, error, data } = useQuery(QUERY_USER_GROUPS, {
    variables: { userId: currentUser._id },
    onError: (err) => {
      console.error("Error in useQuery:", err);
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
  if (error) return <p>Error: {error.message}</p>;
  if (mutationError)
    return <p>Error creating group: {mutationError.message}</p>;

  return (
    <>
      <div className="grid grid-cols-1 mt-10 mb-10 md:container md:mx-auto md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
        {userGroups.map((group) => (
          <Link
            key={group._id}
            className="flex items-center justify-center h-full"
          >
            <Card className="flex-grow max-w-sm">
              <h5 className="flex items-center justify-center flex-grow text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{group.groupName}</p>
              </h5>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <Button onClick={() => props.setOpenModal("form-elements")}>
          <i className="pr-2 fa-solid fa-plus"></i>+ Create Group
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
                <Button type="submit">Create Group!</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default UserGroups;