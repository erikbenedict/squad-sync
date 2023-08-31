import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QUERY_SINGLE_TASK } from '../graphql/queries';
import { Button, Card, Label, Textarea } from 'flowbite-react';
import { UPDATE_TASK_DESCRIPTION } from '../graphql/mutations';

const SelectedTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_TASK, {
    variables: { taskId },
  });
  const task = data?.getSingleTask || {};

  const [newDescription, setNewDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [updateTaskDescription, { error: updateError }] = useMutation(
    UPDATE_TASK_DESCRIPTION,
    {
      refetchQueries: [{ query: QUERY_SINGLE_TASK, variables: { taskId } }],
    }
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDescriptionSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateTaskDescription({
        variables: {
          taskId: taskId,
          taskDescription: newDescription,
        },
      });
      setNewDescription('');
      setSuccessMessage('Task description updated successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There has been an error, please try again later.</p>;
  if (updateError)
    return <p>Error updating description, please try again later.</p>;

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <Card className="w-7/12 p-3 bg-slate-50 rounded-xl">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 2xl:text-5xl xl:text-3xl lg:text-2xl dark:text-white">
              {task.taskName}
            </h5>

            <button
              className="bg-gray-800 dark:bg-white p-2 rounded-lg shadow-lg text-white dark:text-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none"
              onClick={handleGoBack}
            >
              Back
            </button>
          </div>

          {task.priority && (
            <p className="font-medium text-gray-800 dark:text-gray-200 2xl:text-2xl xl:text-xl lg:text-lg">
              Priority: {task.priority}
            </p>
          )}
          {task.dueDate && (
            <p className="font-medium text-gray-800 dark:text-gray-200 2xl:text-2xl xl:text-xl lg:text-lg">
              Due Date: {task.dueDate}
            </p>
          )}
          <p className="font-normal text-gray-700 dark:text-gray-400 2xl:text-2xl xl:text-xl lg:text-lg">
            Description: {task.taskDescription}
          </p>
          <div className="mt-4">
            <form onSubmit={handleDescriptionSubmit}>
              <Label
                htmlFor="newDescription"
                value="Edit Description▼"
                className="2xl:text-xl xl:text-lg lg:text-md"
              />
              <Textarea
                id="newDescription"
                placeholder="Enter Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                required
                className="2xl:text-lg xl:text-md lg:text-sm mb-2"
              />
              <Button type="submit" className="bg-gray-900">
                Update
              </Button>
              {successMessage && (
                <p className="text-red-600">{successMessage}</p>
              )}
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};
export default SelectedTask;
