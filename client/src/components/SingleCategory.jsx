import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  // eslint-disable-next-line no-undef
  const [openModal, setOpenModal] = useState('');
  const [email, setEmail] = useState('');
  const props = { openModal, setOpenModal, email, setEmail };

  return (
    <div className="single-category-container">
      {/* <h3 className="single-category-title">{category.categoryName} Tasks</h3>
      <ListGroup className="task-list">
        {category.tasks.map((task) => (
          <ListGroup.Item
            key={task._id}
            className={`task-item ${getPriorityClass(task.priority)}`}
          >
            <Link to={`/taskPage/${task._id}`}>
              {task.taskName} - {task.dueDate} - {task.users}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup> */}

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
          <div className="space-y-6">
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
          </div>
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
