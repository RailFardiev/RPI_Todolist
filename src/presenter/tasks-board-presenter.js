import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-area-component.js';
import ButtonComponent from '../view/reset-button-component.js';
import PlaceholderComponent from '../view/placeholder-component.js';
import { render } from '../framework/render.js';
import LoadindViewComponent from '../view/LoadingViewComponent.js';

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent();
  #boardContainer;
  #tasksModel;
  #loadingComponent = new LoadindViewComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  async init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    render(this.#loadingComponent, this.#boardContainer);
    await this.#tasksModel.init();
    if (this.#loadingComponent.element) {
      this.#loadingComponent.element.remove();
  }
  }
 

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }
  #handleModelEvent(event, playload) {
    switch(event){
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
          this.#clearBoard();
          this.#renderBoard();
    }
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderBoard() {
    const sortedStatuses = ["backlog", "in-progress", "completed", "recycle-bin"];

    sortedStatuses.forEach((status) => {

      const list = this.#tasksModel.tasks[status];
      if (list) {
        const tasksListComponent = new TasksListComponent(list.title, list.status, this.#handleTaskDrop.bind(this));
        render(tasksListComponent, this.#tasksBoardComponent.element);

        this.#renderTasksList(tasksListComponent, list.tasks);

        if (status === "recycle-bin") {
          const clearButtonComponent = new ButtonComponent();
          tasksListComponent.element.appendChild(clearButtonComponent.element);
          const clearButtonElement = clearButtonComponent.element;
          if(this.#tasksModel.emptyBasketTasks()){
            clearButtonElement.disabled = true;
            clearButtonElement.classList.add('inactive');
          }
          clearButtonComponent.element.addEventListener('click', () => {
            this.#handleClearBasketClick();
          });
        }
      }
    });
  }

  

  #renderTasksList(tasksListComponent, tasks) {
    const tasksListElement = tasksListComponent.element.querySelector('.task-list__tasks');

    if (tasks.length === 0) {
      const placeholderComponent = new PlaceholderComponent();
      render(placeholderComponent, tasksListElement);
    } else {
      tasks.forEach(task => {
        this.#renderTask(task, tasksListElement);
      });
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }
 
  async #handleTaskDrop(taskId, newStatus, newIndex) {
    try{
      render(this.#loadingComponent, this.#boardContainer);
      await this.#tasksModel.updateTaskStatus(taskId,newStatus, newIndex);
      if (this.#loadingComponent.element) {
        this.#loadingComponent.element.remove();
    }
    }catch (err){
      console.error('Ошибка при обновлении статуса задачи: ', err);

    }
  } 
  async #handleClearBasketClick(){
    try{
      render(this.#loadingComponent, this.#boardContainer);
      await this.#tasksModel.clearBasketTasks();
      if (this.#loadingComponent.element) {
        this.#loadingComponent.element.remove();
    }
    }catch(err){
      console.error('Ошибка при очистке корзины: ', err);
    }
  }
}
