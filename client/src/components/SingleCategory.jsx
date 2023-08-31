import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK, REMOVE_TASK } from '../graphql/mutations';
import {
  Button,
  Label,
  Modal,
  TextInput,
  Textarea,
  Select,
} from 'flowbite-react';

export default function SingleCategory({ category, updateCategory }) {
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };

  const [addTask] = useMutation(ADD_TASK);
  const [removeTask] = useMutation(REMOVE_TASK);

  const handleTaskFormSubmit = async (event) => {
    event.preventDefault();

    const categoryId = category._id;
    const taskName = event.target.taskName.value;
    const taskDescription = event.target.taskDescription.value;
    const priority = event.target.priority.value;
    const dueDate = event.target.dueDate.value;

    try {
      const { data } = await addTask({
        variables: {
          categoryId: categoryId,
          taskName: taskName,
          taskDescription: taskDescription,
          dueDate: dueDate,
          priority: priority,
        },
      });
      const tasksWithNewTask = [
        ...category.tasks,
        {
          _id: data.addTask._id,
          taskName: taskName,
          taskDescription: taskDescription,
          dueDate: dueDate,
          priority: priority,
        },
      ];
      console.log(data);
      updateCategory({ ...category, tasks: tasksWithNewTask });
      setOpenModal(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveTask = async (event, taskId) => {
    event.preventDefault();
    const categoryId = category._id;
    try {
      await removeTask({
        variables: {
          categoryId: categoryId,
          taskId: taskId,
        },
      });
      updateCategory({
        ...category,
        tasks: category.tasks.filter((task) => task._id !== taskId),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="single-category-container">
      <div className="border-4 rounded-lg border-solid border-slate-300 w-full flex justify-center items-center mb-3 p-2">
        <h3 className="single-category-title text-xl font-medium">
          {category.categoryName} Tasks
        </h3>
      </div>
      <div className="task-list mb-2">
        {category.tasks.length === 0 ? (
          <div className="items-center bg-slate-400 border-2 rounded-lg border-solid border-slate-300 p-2 text-center">
            Add a task to get started!
          </div>
        ) : (
          category.tasks.map((task) => (
            <div
              key={task._id}
              className={`flex justify-between items-center bg-slate-400 border-2 rounded-lg border-solid border-slate-300 p-2 cursor-pointer ${getPriorityClass(
                task.priority
              )}`}
              href={`/taskPage/${task._id}`}
            >
              <div>
                <h3>{task.taskName}</h3>
                <div>{task.dueDate ? `Due Date: ${task.dueDate}` : null}</div>
              </div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs text-center"
                onClick={(event) => handleRemoveTask(event, task._id)}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>

      {/* <---- Modal ----> */}
      <Button onClick={() => props.setOpenModal('form-elements')}>
        <i className="fa-solid fa-plus"></i>Task
      </Button>
      <Modal
        show={props.openModal === 'form-elements'}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleTaskFormSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create a new task
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskName" value="Task Name" />
              </div>
              <TextInput
                id="taskName"
                placeholder="Enter a name for the new task"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskDescription" value="Task Details" />
              </div>
              <Textarea
                id="taskDescription"
                placeholder="Enter details about the task"
                required
                rows={5}
              />
            </div>
            <div className="max-w-md" id="select">
              <div className="mb-2 block">
                <Label
                  htmlFor="priority"
                  value="Select priority level of task"
                />
              </div>
              <Select id="priority" required>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dueDate" value="Enter a due date (if any)" />
              </div>
              <TextInput
                type="text"
                id="dueDate"
                placeholder="MM/dd/yyyy"
                pattern="\d{2}/\d{2}/\d{4}"
              />
            </div>
            <div className="w-full">
              <Button type="submit">Add task!</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

function getPriorityClass(priority) {
  if (priority === 'High') {
    return 'bg-red-500';
  }
  if (priority === 'Medium') {
    return 'bg-amber-500';
  }
  if (priority === 'Low') {
    return 'bg-green-500';
  }
  return '';
}
