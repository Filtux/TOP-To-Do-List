import { addProject, getProjectByName, projects, removeProject, selectProject } from './index';
import { saveProjectsToLocalStorage } from './storage';
import Todo from './todo';

const createTodoElement = (todo, project) => {
  const todoElement = document.createElement('div');
  todoElement.classList.add('todo');

  const titleElement = document.createElement('h3');
  titleElement.textContent = todo.title;
  todoElement.appendChild(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = todo.description;
  todoElement.appendChild(descriptionElement);

  const dueDateElement = document.createElement('p');
  dueDateElement.textContent = `Due: ${todo.dueDate}`;
  todoElement.appendChild(dueDateElement);

  const priorityElement = document.createElement('p');
  priorityElement.textContent = `Priority: ${todo.priority}`;
  todoElement.appendChild(priorityElement);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-todo');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    project.removeTodo(todo.title);
    renderTodos(project);
    saveProjectsToLocalStorage(projects);
  });
  todoElement.appendChild(deleteButton);

  return todoElement;
};

const renderTodos = (project) => {
  const todoContainer = document.querySelector('.todo-container');
  todoContainer.innerHTML = `
    <h2 class="to-do-header">To-Do</h2>
    <div class="new-todo-container">
      <input type="text" class="todo-title" placeholder="Title">
      <input type="text" class="todo-description" placeholder="Description">
      <input type="date" class="todo-dueDate">
      <input type="text" class="todo-priority" placeholder="Priority">
      <button class="add-todo-btn">Add To-Do</button>
    </div>
  `;
  project.getTodos().forEach(todo => {
    todoContainer.appendChild(createTodoElement(todo, project));
  });

  setupAddTodoListener();
};

const createProjectElement = (project) => {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project');

  const projectNameElement = document.createElement('span');
  projectNameElement.textContent = project.name;
  projectNameElement.addEventListener('click', () => {
    renderTodos(project);
    document.querySelectorAll('.project').forEach(proj => proj.classList.remove('selected'));
    projectElement.classList.add('selected');
  });
  projectElement.appendChild(projectNameElement);

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-project');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    removeProject(project.name);
    renderProjects();
    saveProjectsToLocalStorage(projects);
  });
  projectElement.appendChild(removeButton);

  return projectElement;
};

const renderProjects = () => {
  const projectContainer = document.querySelector('.project-container');
  projectContainer.innerHTML = '<h2 class="project-header">Projects</h2>';
  projects.forEach(project => {
    projectContainer.appendChild(createProjectElement(project));
  });
};

const setupAddTodoListener = () => {
  const addTodoBtn = document.querySelector('.add-todo-btn');
  if (addTodoBtn) {
    addTodoBtn.addEventListener('click', () => {
      const title = document.querySelector('.todo-title').value;
      const description = document.querySelector('.todo-description').value;
      const dueDate = document.querySelector('.todo-dueDate').value;
      const priority = document.querySelector('.todo-priority').value;

      const newTodo = Todo(title, description, dueDate, priority);
      const currentProjectElement = document.querySelector('.project.selected');
      const projectName = currentProjectElement ? currentProjectElement.querySelector('span').textContent : 'Default';
      const project = getProjectByName(projectName);
      project.addTodo(newTodo);

      renderTodos(project);
      saveProjectsToLocalStorage(projects);
    });
  }
};

const setupEventListeners = () => {
  const addProjectBtn = document.querySelector('.add-project-btn');
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      const projectName = document.querySelector('.project-title').value;
      if (projectName && !getProjectByName(projectName)) {
        addProject(projectName);
        renderProjects();
        selectProject(projectName);
        saveProjectsToLocalStorage(projects);
      }
    });
  }
};

export {
  renderTodos,
  renderProjects,
  setupEventListeners,
};
