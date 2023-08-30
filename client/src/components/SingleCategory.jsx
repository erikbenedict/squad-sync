import { useState } from 'react';
import { useMutation } from '@apollo/client';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { Link } from 'react-router-dom';
import { ADD_TASK } from '../graphql/mutations';
import {
  ListGroup,
  Button,
  Label,
  Modal,
  TextInput,
  Textarea,
  Select,
} from 'flowbite-react';

export default function SingleCategory({ category }) {
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };
  // const [startDate, setStartDate] = useState(new Date());

  const [addTask] = useMutation(ADD_TASK);

  const handleTaskFormSubmit = async (event) => {
    event.preventDefault();
    const categoryId = category._id;
    const taskName = event.target.taskName.value;
    const taskDescription = event.target.taskDescription.value;
    const dueDate = event.target.dueDate.value;
    const priority = event.target.priority.value;

    try {
      await addTask({
        variables: {
          categoryId: categoryId,
          taskName: taskName,
          taskDescription: taskDescription,
          dueDate: dueDate,
          priority: priority,
        },
      });
      props.setOpenModal(undefined);
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
      <ListGroup className="task-list mb-2">
        {category.tasks.length === 0 ? (
          <ListGroup.Item className=" bg-slate-400 border-2 rounded-lg border-solid border-slate-300">
            Add a task to get started!
          </ListGroup.Item>
        ) : (
          category.tasks.map((task) => (
            <ListGroup.Item
              key={task._id}
              className={`task-item bg-slate-400 border-2 rounded-lg border-solid border-slate-300 ${getPriorityClass(
                task.priority
              )}`}
              href={`/taskPage/${task._id}`}
            >
              {task.taskName} - {task.dueDate} - {task.users}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>

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
  if (priority === 'high') {
    return 'task-priority-high';
  }
  if (priority === 'medium') {
    return 'task-priority-medium';
  }
  if (priority === 'low') {
    return 'task-priority-low';
  }
  return ''; // Default class if priority is not matched
}
