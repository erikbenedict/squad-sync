import { ListGroup } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SingleCategory({ category }) {
  return (
    <div className='single-category-container'>
      <h3 className='single-category-title'>{category.categoryName} Tasks</h3>
      <ListGroup className='task-list'>
        {category.tasks.map(task => (
          <ListGroup.Item key={task._id} className={`task-item ${getPriorityClass(task.priority)}`}>
            <Link to={`/taskPage/${task._id}`}>{task.taskName} - {task.dueDate} - {task.users}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
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