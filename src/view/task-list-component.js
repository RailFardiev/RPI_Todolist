import { render, remove } from '../framework/render.js';
import { StatusLabel } from '../const.js'; 
import TaskComponent from './task-component.js'; 
import EmptyTaskListComponent from './empty-task-list-component.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js'; 

function createTaskListComponentTemplate(status) {
    return (
        `<div class="task-board ${status}">
            <h2>${StatusLabel[status]}</h2> 
            <div class="task-list__tasks"></div>
        </div>`
    );
}

export default class TaskListComponent extends AbstractComponent {
    constructor({ status }) {
        super();
        this.status = status; 
        this.tasks = [];
        this.emptyTaskListComponent = new EmptyTaskListComponent();
    }

    get template() {
        return createTaskListComponentTemplate(this.status);
    }

    addTask(task) {
        this.tasks.push(task);
        
        if (this.tasks.length === 1) {
            remove(this.emptyTaskListComponent);
        }

        const taskComponent = new TaskComponent({ task });
        render(taskComponent, this.element.querySelector('.task-list__tasks'));
    }

    renderEmptyMessage() {
        if (this.tasks.length === 0) {
            render(this.emptyTaskListComponent, this.element.querySelector('.task-list__tasks'));
        }
    }
}
