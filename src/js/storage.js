import Project from './project';

const saveProjectsToLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const loadProjectsFromLocalStorage = () => {
  const projects = localStorage.getItem('projects');
  if (!projects) {
    return [];
  }

  const parsedProjects = JSON.parse(projects);
  return parsedProjects.map(project => {
    const reconstructedProject = Project(project.name, project.todos || []);
    return reconstructedProject;
  });
};

export { saveProjectsToLocalStorage, loadProjectsFromLocalStorage };
