import '../css/styles.css';
import Project from './project';
import { renderTodos, renderProjects, setupEventListeners } from './dom';
import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from './storage';

// Initialize projects from local storage
let projects = loadProjectsFromLocalStorage();
if (projects.length === 0) {
  const defaultProject = Project('Default');
  projects.push(defaultProject);
}

// Save projects to local storage whenever they change
const saveProjects = () => {
  saveProjectsToLocalStorage(projects);
};

const addProject = (projectName) => {
  const project = Project(projectName);
  projects.push(project);
  renderProjects();
  saveProjects();
};

const getProjectByName = (name) => {
  return projects.find(project => project.name === name);
};

// Expose projects array for rendering
export { projects };

const updateProjectSelector = () => {
  renderProjects();  // Render the initial project list
};

// Initialize DOM content and event listeners
document.addEventListener('DOMContentLoaded', () => {
  updateProjectSelector();
  const defaultProject = getProjectByName('Default');
  renderTodos(defaultProject);
  setupEventListeners();
});

export {
  addProject,
  getProjectByName,
};
