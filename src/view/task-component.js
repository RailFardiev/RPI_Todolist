import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js'; 

function createTaskComponentTemplate(task) {
    const { title } = task;
    return `<div class="task-item">${title}</div>`;
}

export default class TaskComponent extends AbstractComponent {
    constructor({ task }) {
        // Вызов super() перед использованием this
        super();
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }
}
