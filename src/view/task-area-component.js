import {createElement} from '../framework/render.js';
import {AbstractComponent} from '../framework/view/abstract-component.js'; 

function createTaskAreaComponentTemplate() {
    return `<section class="task-boards"></section>`;
}

export default class TaskAreaComponent extends AbstractComponent{
    get template() {
        return createTaskAreaComponentTemplate();
    }


}
