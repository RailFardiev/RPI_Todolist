import { createElement, render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js'; // Импортируем Status и StatusLabel
import TaskComponent from './task-component.js'; // Убедитесь, что это правильный импорт

function createTaskListComponentTemplate(status) {
    return (
        `<div class="task-board ${status}">
            <h2>${StatusLabel[status]}</h2> <!-- Используем StatusLabel для получения русского названия -->
        </div>`
    );
}

export default class TaskListComponent {
    constructor({ status }) {
        this.status = status; // Храним статус, чтобы использовать его в шаблоне
        this.tasks = []; // Инициализируем массив для задач
        this.element = null; // Инициализируем элемент
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
        this.tasks.push(task); // Добавляем задачу в массив

        const taskComponent = new TaskComponent({ task }); // Создаем новый экземпляр TaskComponent
        render(taskComponent, this.getElement()); // Используем getElement() для добавления задачи в компонент списка задач
    }

    removeElement() {
        this.element = null; // Удаляем элемент для последующего создания нового
    }
}
