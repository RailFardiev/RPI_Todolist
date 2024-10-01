import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEmptyTaskListTemplate() {
    return (
        `<div class="empty-task-list" style="border: 1px dashed #ccc; padding: 20px; text-align: center;">
            Перетащите карточку
        </div>`
    );
}

export default class EmptyTaskListComponent extends AbstractComponent {
    get template() {
        return createEmptyTaskListTemplate();
    }
}
