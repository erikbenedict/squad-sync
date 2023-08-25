function SingleCategory({ category }) {
  return (
    <div className='single-category-container'>
      <h3 className='single-category-title'>{category.categoryName} Tasks</h3>
      <ul className='task-list'>
        {category.tasks.map(task => (
          <li key={task._id}>{task.taskName}{task.dueDate}{task.users}</li>
        ))}
      </ul>
    </div>
  );
}
