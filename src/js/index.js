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
  selectProject(projectName);
  saveProjects();
};

const removeProject = (projectName) => {
    projects = projects.filter(project => project.name !== projectName);
    renderProjects();
    if (projects.length === 0) {
      const defaultProject = Project('Default');
      projects.push(defaultProject);
    }
    saveProjects();
    const defaultProject = getProjectByName('Default');
    renderTodos(defaultProject);
  };

const getProjectByName = (name) => {
  return projects.find(project => project.name === name);
};

// Expose projects array for rendering
export { projects };

const updateProjectSelector = () => {
  renderProjects();  // Render the initial project list
};

const selectProject = (projectName) => {
    const projectElements = document.querySelectorAll('.project');
    projectElements.forEach(projectElement => {
      if (projectElement.querySelector('span').textContent === projectName) {
        projectElement.classList.add('selected');
        renderTodos(getProjectByName(projectName));
      } else {
        projectElement.classList.remove('selected');
      }
    });
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
  removeProject,
  getProjectByName,
  selectProject,
};
