import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskAreaComponent from './view/task-area-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';

// Выбираем контейнер для приложения
const bodyContainer = document.querySelector('.board-app');

// Рендерим заголовок и форму добавления задач
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), bodyContainer);

// Создаём контейнер для доски задач
const tasksBoardContainer = document.createElement('div');
tasksBoardContainer.classList.add('task-board');
bodyContainer.appendChild(tasksBoardContainer); // Добавляем контейнер в DOM

// Создаем модель задач
const tasksModel = new TasksModel(); // Убедись, что TasksModel импортирован правильно и метод getTasks() существует

// Инициализируем презентер задач
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  taskModel: tasksModel, // Передаем model задач в презентер
});

// Запускаем презентер
tasksBoardPresenter.init();
