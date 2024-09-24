import TaskListComponent from '../view/task-list-component.js'; 
import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js'; 

export default class TasksBoardPresenter {
    constructor({ boardContainer, tasksModel }) {
        this.boardContainer = boardContainer;
        this.tasksModel = tasksModel;
    }

    init() {
        const tasks = this.tasksModel.getTasks();

        // Создаем массив для статусов
        const statuses = ['backlog', 'in-progress', 'completed', 'recycle-bin'];

        statuses.forEach(status => {
            const taskListComponent = new TaskListComponent({ status }); 
            render(taskListComponent, this.boardContainer);

            tasks.forEach(task => {
                if (task.status === status) {
                    taskListComponent.addTask(task); 
                }
            });
        });
    }
}
