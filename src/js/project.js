const Project = (name, todos = []) => {
    const addTodo = (todo) => {
      todos.push(todo);
    };
  
    const removeTodo = (todoTitle) => {
      const index = todos.findIndex(todo => todo.title === todoTitle);
      if (index > -1) {
        todos.splice(index, 1);
      }
    };
  
    const getTodos = () => todos;
  
    return {
      name,
      addTodo,
      removeTodo,
      getTodos,
    };
  };
  
  export default Project;
  