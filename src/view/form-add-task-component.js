import {createElement} from '../framework/render.js';
import {AbstractComponent} from '../framework/view/abstract-component.js'; 

function createFormAddTaskComponentTemplate() {
    return (
        `<section class="task-creator">
            <h3>Новая задача</h3>
            <input type="text" placeholder="название задачи..." />
            <button>+ Добавить</button>
        </section>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {
    
    get template() {
        return createFormAddTaskComponentTemplate();
    }


}
