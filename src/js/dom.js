import { addProject, getProjectByName, projects } from './index';
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
  todoContainer.innerHTML = '<h2 class="todo-header">Todos</h2>';
  project.getTodos().forEach(todo => {
    todoContainer.appendChild(createTodoElement(todo, project));
  });
};

const createProjectElement = (project) => {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project');
  projectElement.textContent = project.name;
  projectElement.addEventListener('click', () => {
    renderTodos(project);
    document.querySelectorAll('.project').forEach(proj => proj.classList.remove('selected'));
    projectElement.classList.add('selected');
  });
  return projectElement;
};

const renderProjects = () => {
  const projectContainer = document.querySelector('.project-container');
  projectContainer.innerHTML = '<h2 class="project-header">Projects</h2>';
  projects.forEach(project => {
    projectContainer.appendChild(createProjectElement(project));
  });
};

const setupEventListeners = () => {
  document.querySelector('.add-todo-btn').addEventListener('click', () => {
    const title = document.querySelector('.todo-title').value;
    const description = document.querySelector('.todo-description').value;
    const dueDate = document.querySelector('.todo-dueDate').value;
    const priority = document.querySelector('.todo-priority').value;

    const newTodo = Todo(title, description, dueDate, priority);
    const currentProject = document.querySelector('.project.selected');
    const projectName = currentProject ? currentProject.textContent : 'Default';
    const project = getProjectByName(projectName);
    project.addTodo(newTodo);

    renderTodos(project);
    saveProjectsToLocalStorage(projects);
  });

  document.querySelector('.add-project-btn').addEventListener('click', () => {
    const projectName = document.querySelector('.project-title').value;
    if (projectName && !getProjectByName(projectName)) {
      addProject(projectName);
      renderProjects();
      saveProjectsToLocalStorage(projects);
    }
  });
};

export {
  renderTodos,
  renderProjects,
  setupEventListeners,
};
