import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-area-component.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, taskModel }) {
    this.boardContainer = boardContainer;
    this.taskModel = taskModel;
  }

  init() {
    this.boardTasks = [...this.taskModel.getTasks()]; // Получаем задачи из модели

    // Создаём контейнер для доски задач
    const tasksBoardContainer = document.createElement('div');
    tasksBoardContainer.classList.add('task-board');
    render(this.tasksBoardComponent, this.boardContainer); // Рендерим компонент доски задач

    this.boardTasks.filter(task => task.status == "backlog").forEach(task => {

    });

    // Рендеринг списков задач
    for (let i = 0; i < Math.min(this.boardTasks.length, 4); i++) {
      const tasksListComponent = new TasksListComponent({ task: this.boardTasks[i] }); // Передаем задачу в компонент
      render(tasksListComponent, tasksBoardContainer); // Рендерим список задач в контейнер

      // Рендеринг задач внутри каждого списка
      for (let j = 0; j < Math.min(this.boardTasks.length, 4); j++) {
        const task = this.boardTasks[j];
        const taskComponent = new TaskComponent({ task }); // Передаем задачу в компонент
        render(taskComponent, tasksListComponent.getElement()); // Рендерим задачу в списке задач
      }
    }

    // Добавляем контейнер с задачами в общий DOM
    this.boardContainer.appendChild(tasksBoardContainer);
  }
}