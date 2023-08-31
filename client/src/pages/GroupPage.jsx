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
    <div className="container max-w-[75%] mx-auto">
      <header className="group-header mt-5 mb-5 flex items-end justify-between">
        <h1 className="group-name text-5xl">{group.groupName}</h1>
        <div className="flex">
          <Button onClick={() => props.setShowOuterModal('default')}>
            Group Members
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
                    <li key={user._id} className="pr-2">
                      •{user.firstName} {user.lastName}
                    </li>
                  ))}
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* Add new member modal */}
              <Button onClick={() => props.setShowInnerModal('form-elements')}>
                Add member
              </Button>
              <Modal
                show={props.showInnerModal === 'form-elements'}
                size="md"
                popup
                onClose={() => props.setShowInnerModal(undefined)}
              >
                <Modal.Header />
                <Modal.Body>
                  <form className="space-y-6" onSubmit={handleMemberFormSubmit}>
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
                      <Button type="submit">Add member!</Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </Modal.Footer>
          </Modal>
        </div>
      </header>
      <div className="border-4 rounded-lg border-solid border-slate-300 p-3 mb-3">
        <Categories groupId={groupId} />
      </div>
      <div className="flex justify-end">
        {/* <---- Modal ----> */}
        <Button onClick={() => props.setOpenModal('pop-up')} color="failure">
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
                <span className="text-xl font-bold">{group.groupName}</span>?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteGroup}>
                  Yes, I&rsquo;m sure
                </Button>
                <Button
                  color="gray"
                  onClick={() => props.setOpenModal(undefined)}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default GroupPage;
