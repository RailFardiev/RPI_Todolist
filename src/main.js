import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskAreaComponent from './view/task-area-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), bodyContainer);

// Сначала создаем и отрисовываем TaskAreaComponent
const taskAreaComponent = new TaskAreaComponent();
render(taskAreaComponent, bodyContainer); // Отрисовываем TaskAreaComponent

const tasksBoardContainer = taskAreaComponent.getElement(); // Получаем элемент TaskAreaComponent

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel,
});

tasksBoardPresenter.init();
