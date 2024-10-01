import TaskListComponent from '../view/task-list-component.js'; 
import { render } from '../framework/render.js'; 

export default class TasksBoardPresenter {
    constructor({ boardContainer, tasksModel }) {
        this.boardContainer = boardContainer;
        this.tasksModel = tasksModel;
    }

    init() {
        const tasks = this.tasksModel.getTasks();
        const statuses = ['backlog', 'in-progress', 'completed', 'recycle-bin'];

        statuses.forEach(status => {
            const taskListComponent = new TaskListComponent({ status });
            render(taskListComponent, this.boardContainer);

            const statusTasks = tasks.filter(task => task.status === status);

            if (statusTasks.length > 0) {
                statusTasks.forEach(task => {
                    taskListComponent.addTask(task);
                });
            } else {
                taskListComponent.renderEmptyMessage(); 
            }
        });
    }
}
