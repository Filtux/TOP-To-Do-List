const Todo = (title, description, dueDate, priority, notes = '', checklist = []) => {
    return {
      title,
      description,
      dueDate,
      priority,
      notes,
      checklist,
      isCompleted: false,
    };
  };
  
  export default Todo;
  