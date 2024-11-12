import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskAreaComponent from './view/task-area-component.js';
import { render, RenderPosition } from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import { generateTaskId } from './utils.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.placeholder-place');
const taskAreaContainer = document.querySelector('.task-area');
const tasksBoardContainer = document.querySelector('.task-area');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({ boardContainer: tasksBoardContainer, tasksModel });

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new TaskAreaComponent(), tasksBoardContainer, RenderPosition.BEFOREBEGIN);

formContainer.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const inputField = formContainer.querySelector('.input-text');
  const taskTitle = inputField.value.trim();

  if (taskTitle) {
    const newTask = {
      id: generateTaskId(),
      title: taskTitle,
    };

    tasksModel.addTask(newTask); 
    inputField.value = ''; 
  }
});

tasksBoardPresenter.init();
