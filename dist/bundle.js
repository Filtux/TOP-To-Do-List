/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/dom.js":
/*!***********************!*\
  !*** ./src/js/dom.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderProjects: () => (/* binding */ renderProjects),
/* harmony export */   renderTodos: () => (/* binding */ renderTodos),
/* harmony export */   setupEventListeners: () => (/* binding */ setupEventListeners)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/js/index.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo */ "./src/js/todo.js");



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
    (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveProjectsToLocalStorage)(_index__WEBPACK_IMPORTED_MODULE_0__.projects);
  });
  todoElement.appendChild(deleteButton);
  return todoElement;
};
const renderTodos = project => {
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
const createProjectElement = project => {
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
    (0,_index__WEBPACK_IMPORTED_MODULE_0__.removeProject)(project.name);
    renderProjects();
    (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveProjectsToLocalStorage)(_index__WEBPACK_IMPORTED_MODULE_0__.projects);
  });
  projectElement.appendChild(removeButton);
  return projectElement;
};
const renderProjects = () => {
  const projectContainer = document.querySelector('.project-container');
  projectContainer.innerHTML = '<h2 class="project-header">Projects</h2>';
  _index__WEBPACK_IMPORTED_MODULE_0__.projects.forEach(project => {
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
      const newTodo = (0,_todo__WEBPACK_IMPORTED_MODULE_2__["default"])(title, description, dueDate, priority);
      const currentProjectElement = document.querySelector('.project.selected');
      const projectName = currentProjectElement ? currentProjectElement.querySelector('span').textContent : 'Default';
      const project = (0,_index__WEBPACK_IMPORTED_MODULE_0__.getProjectByName)(projectName);
      project.addTodo(newTodo);
      renderTodos(project);
      (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveProjectsToLocalStorage)(_index__WEBPACK_IMPORTED_MODULE_0__.projects);
    });
  }
};
const setupEventListeners = () => {
  const addProjectBtn = document.querySelector('.add-project-btn');
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      const projectName = document.querySelector('.project-title').value;
      if (projectName && !(0,_index__WEBPACK_IMPORTED_MODULE_0__.getProjectByName)(projectName)) {
        (0,_index__WEBPACK_IMPORTED_MODULE_0__.addProject)(projectName);
        renderProjects();
        (0,_index__WEBPACK_IMPORTED_MODULE_0__.selectProject)(projectName);
        (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveProjectsToLocalStorage)(_index__WEBPACK_IMPORTED_MODULE_0__.projects);
      }
    });
  }
};


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProject: () => (/* binding */ addProject),
/* harmony export */   getProjectByName: () => (/* binding */ getProjectByName),
/* harmony export */   projects: () => (/* binding */ projects),
/* harmony export */   removeProject: () => (/* binding */ removeProject),
/* harmony export */   selectProject: () => (/* binding */ selectProject)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/styles.css */ "./src/css/styles.css");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/js/project.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/js/dom.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");





// Initialize projects from local storage
let projects = (0,_storage__WEBPACK_IMPORTED_MODULE_3__.loadProjectsFromLocalStorage)();
if (projects.length === 0) {
  const defaultProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__["default"])('Default');
  projects.push(defaultProject);
}

// Save projects to local storage whenever they change
const saveProjects = () => {
  (0,_storage__WEBPACK_IMPORTED_MODULE_3__.saveProjectsToLocalStorage)(projects);
};
const addProject = projectName => {
  const project = (0,_project__WEBPACK_IMPORTED_MODULE_1__["default"])(projectName);
  projects.push(project);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.renderProjects)();
  selectProject(projectName);
  saveProjects();
};
const removeProject = projectName => {
  projects = projects.filter(project => project.name !== projectName);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.renderProjects)();
  if (projects.length === 0) {
    const defaultProject = (0,_project__WEBPACK_IMPORTED_MODULE_1__["default"])('Default');
    projects.push(defaultProject);
  }
  saveProjects();
  const defaultProject = getProjectByName('Default');
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.renderTodos)(defaultProject);
};
const getProjectByName = name => {
  return projects.find(project => project.name === name);
};

// Expose projects array for rendering

const updateProjectSelector = () => {
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.renderProjects)(); // Render the initial project list
};
const selectProject = projectName => {
  const projectElements = document.querySelectorAll('.project');
  projectElements.forEach(projectElement => {
    if (projectElement.querySelector('span').textContent === projectName) {
      projectElement.classList.add('selected');
      (0,_dom__WEBPACK_IMPORTED_MODULE_2__.renderTodos)(getProjectByName(projectName));
    } else {
      projectElement.classList.remove('selected');
    }
  });
};

// Initialize DOM content and event listeners
document.addEventListener('DOMContentLoaded', () => {
  updateProjectSelector();
  const defaultProject = getProjectByName('Default');
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.renderTodos)(defaultProject);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.setupEventListeners)();
});


/***/ }),

/***/ "./src/js/project.js":
/*!***************************!*\
  !*** ./src/js/project.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Project = (name, todos = []) => {
  const addTodo = todo => {
    todos.push(todo);
  };
  const removeTodo = todoTitle => {
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
    getTodos
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadProjectsFromLocalStorage: () => (/* binding */ loadProjectsFromLocalStorage),
/* harmony export */   saveProjectsToLocalStorage: () => (/* binding */ saveProjectsToLocalStorage)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/js/project.js");

const saveProjectsToLocalStorage = projects => {
  localStorage.setItem('projects', JSON.stringify(projects));
};
const loadProjectsFromLocalStorage = () => {
  const projects = localStorage.getItem('projects');
  if (!projects) {
    return [];
  }
  const parsedProjects = JSON.parse(projects);
  return parsedProjects.map(project => {
    const reconstructedProject = (0,_project__WEBPACK_IMPORTED_MODULE_0__["default"])(project.name, project.todos || []);
    return reconstructedProject;
  });
};


/***/ }),

/***/ "./src/js/todo.js":
/*!************************!*\
  !*** ./src/js/todo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Todo = (title, description, dueDate, priority, notes = '', checklist = []) => {
  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    isCompleted: false
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body, html {
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }
  
  .app {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100vw;
    height: 100vh;
  }
  
  .sidebar {
    background-color: #2f4f4f;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  }
  
  .sidebar-title {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 2em;
    text-align: center;
  }
  
  .project-container {
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;
    overflow-y: auto;
  }
  
  .project-header {
    align-self: flex-end;
  }
  
  .add-project-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .project-title {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .add-project-btn {
    background-color: #1e90ff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .add-project-btn:hover {
    background-color: #1c86ee;
  }
  
  .todo-container {
    background-color: #d0e7e7;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .todo-header {
    margin-bottom: 10px;
  }
  
  .new-todo-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .add-todo-btn {
    background-color: #1e90ff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .add-todo-btn:hover {
    background-color: #1c86ee;
  }`, "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;EACxB;;EAEA;IACE,WAAW;IACX,YAAY;IACZ,8BAA8B;EAChC;;EAEA;IACE,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,aAAa;EACf;;EAEA;IACE,yBAAyB;IACzB,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,8BAA8B;IAC9B,aAAa;EACf;;EAEA;IACE,yBAAyB;IACzB,uBAAuB;IACvB,cAAc;IACd,kBAAkB;EACpB;;EAEA;IACE,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,gBAAgB;EAClB;;EAEA;IACE,oBAAoB;EACtB;;EAEA;IACE,kBAAkB;IAClB,gBAAgB;EAClB;;EAEA;IACE,WAAW;IACX,aAAa;IACb,mBAAmB;EACrB;;EAEA;IACE,yBAAyB;IACzB,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,eAAe;EACjB;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,yBAAyB;IACzB,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,YAAY;EACd;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,kBAAkB;IAClB,gBAAgB;EAClB;;EAEA;IACE,yBAAyB;IACzB,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,eAAe;EACjB;;EAEA;IACE,yBAAyB;EAC3B","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n  \n  body, html {\n    width: 100%;\n    height: 100%;\n    font-family: Arial, sans-serif;\n  }\n  \n  .app {\n    display: grid;\n    grid-template-columns: 1fr 3fr;\n    width: 100vw;\n    height: 100vh;\n  }\n  \n  .sidebar {\n    background-color: #2f4f4f;\n    color: white;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    padding: 20px;\n  }\n  \n  .sidebar-title {\n    writing-mode: vertical-rl;\n    text-orientation: mixed;\n    font-size: 2em;\n    text-align: center;\n  }\n  \n  .project-container {\n    display: flex;\n    flex-direction: column-reverse;\n    flex-grow: 1;\n    overflow-y: auto;\n  }\n  \n  .project-header {\n    align-self: flex-end;\n  }\n  \n  .add-project-container {\n    text-align: center;\n    margin-top: 20px;\n  }\n  \n  .project-title {\n    width: 100%;\n    padding: 10px;\n    margin-bottom: 10px;\n  }\n  \n  .add-project-btn {\n    background-color: #1e90ff;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n  }\n  \n  .add-project-btn:hover {\n    background-color: #1c86ee;\n  }\n  \n  .todo-container {\n    background-color: #d0e7e7;\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    flex-grow: 1;\n  }\n  \n  .todo-header {\n    margin-bottom: 10px;\n  }\n  \n  .new-todo-container {\n    text-align: center;\n    margin-top: 20px;\n  }\n  \n  .add-todo-btn {\n    background-color: #1e90ff;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n  }\n  \n  .add-todo-btn:hover {\n    background-color: #1c86ee;\n  }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map