import {createElement} from '../framework/render.js';

function createTaskListComponentTemplate(task) {
    const{title, status} = task;
    return (
        `<div class="task-board">
            <h2>${status}</h2>
        </div>`
    );
}

export default class TaskListComponent {
    constructor({task}){
        this.task = task;
    }
    getTemplate() {
        return createTaskListComponentTemplate(this.task);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}
