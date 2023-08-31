import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QUERY_SINGLE_GROUP } from '../graphql/queries';
import { ADD_USER_TO_GROUP, REMOVE_GROUP } from '../graphql/mutations';
import Categories from '../components/Categories';
import { Button, Modal, TextInput, Label } from 'flowbite-react';

function GroupPage() {
  const [openModal, setOpenModal] = useState('');
  const [showOuterModal, setShowOuterModal] = useState('');
  const [showInnerModal, setShowInnerModal] = useState('');
  const props = {
    openModal,
    setOpenModal,
    showOuterModal,
    setShowOuterModal,
    showInnerModal,
    setShowInnerModal,
  };
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { groupId },
  });
  const group = data?.getSingleGroup || {};

  const [addUserToGroup] = useMutation(ADD_USER_TO_GROUP);

  const handleMemberFormSubmit = async (event) => {
    event.preventDefault();
    const userEmail = event.target.userEmail.value;

    try {
      await addUserToGroup({
        variables: { groupId: groupId, email: userEmail },
      });
      props.setShowInnerModal(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const [removeGroup] = useMutation(REMOVE_GROUP);
  const handleDeleteGroup = async (event) => {
    event.preventDefault();
    try {
      await removeGroup({
        variables: { groupId },
      });
      props.setShowInnerModal(undefined);
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-screen p-6 bg-gray-100 dark:bg-gray-900 md:w-3/4 mx-auto">
      <div className="lg:my-20 p-8 bg-gray-400 dark:bg-gray-600 rounded-md shadow-md">
        <header className="group-header mt-5 mb-5 md:flex md:items-end justify-between items-center">
          <h1 className="group-name text-center text-2xl mr-1 md:text-5xl font-semibold dark:text-white">
            {group.groupName}
          </h1>
          <div className="flex justify-center">
            <Button
              onClick={() => props.setShowOuterModal('default')}
              className="md:p-1 mt-2 text-white bg-gray-700 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
            >
              <span className="hidden md:block">Group</span> Members
            </Button>
            <Modal
              show={props.showOuterModal === 'default'}
              onClose={() => props.setShowOuterModal(undefined)}
            >
              <Modal.Header>{group.groupName} Members</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <ul>
                    {group.users.map((user) => (
                      <li key={user._id} className="text-lg font-medium">
                        • {user.firstName} {user.lastName}
                      </li>
                    ))}
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* Add new member modal */}
                <Button
                  onClick={() => props.setShowInnerModal('form-elements')}
                  className="p-1 mt-2 text-white bg-gray-700 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
                >
                  ✚ Add member
                </Button>
                <Modal
                  show={props.showInnerModal === 'form-elements'}
                  size="md"
                  popup
                  onClose={() => props.setShowInnerModal(undefined)}
                >
                  <Modal.Header />
                  <Modal.Body>
                    <form
                      className="space-y-6"
                      onSubmit={handleMemberFormSubmit}
                    >
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Add a new member
                      </h3>
                      <div>
                        <div className="mb-2 block">
                          <Label
                            htmlFor="userEmail"
                            value="Email address of new member"
                          />
                        </div>
                        <TextInput
                          id="userEmail"
                          placeholder="member@example.com"
                          required
                        />
                      </div>
                      <div className="w-full">
                        <Button
                          type="submit"
                          className="p-1 mt-2 text-white bg-gray-700 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
                        >
                          Add member!
                        </Button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </Modal.Footer>
            </Modal>
          </div>
        </header>
        <div className=" bg-gray-100 dark:bg-gray-400 rounded-md border-8 p-3 mb-3">
          <Categories groupId={groupId} />
        </div>
        <div className="flex justify-center md:justify-end">
          {/* <---- Modal ----> */}
          <Button
            onClick={() => props.setOpenModal('pop-up')}
            color="failure"
            className="transition ease-in-out hover:-translate-y-1 hover:scale-110 focus:outline-none"
          >
            Delete Group
          </Button>
          <Modal
            show={props.openModal === 'pop-up'}
            size="md"
            popup
            onClose={() => props.setOpenModal(undefined)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete{' '}
                  <span className="text-xl dark:text-white font-bold">
                    {group.groupName}
                  </span>
                  ?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    color="failure"
                    onClick={handleDeleteGroup}
                    className="transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
                  >
                    Yes, I&rsquo;m sure
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => props.setOpenModal(undefined)}
                    className="transition ease-in-out hover:-translate-y-1 hover:scale-105 focus:outline-none"
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
