import { createElement, render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js'; 
import TaskComponent from './task-component.js'; 

function createTaskListComponentTemplate(status) {
    return (
        `<div class="task-board ${status}">
            <h2>${StatusLabel[status]}</h2> <!-- Используем StatusLabel для получения русского названия -->
        </div>`
    );
}

export default class TaskListComponent {
    constructor({ status }) {
        this.status = status; 
        this.tasks = []; 
        this.element = null; 
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.status);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }

    addTask(task) {
        this.tasks.push(task); 

        const taskComponent = new TaskComponent({ task });
        render(taskComponent, this.getElement());
    }

    removeElement() {
        this.element = null; 
    }
}
