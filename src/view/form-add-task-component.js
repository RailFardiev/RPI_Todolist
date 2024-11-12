import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return (
    `<section class="task-creator">
        <h2>Новая задача</h2>
        <div>
            <form>
                <input type="text" name="text" class="input-text" placeholder="Название задачи..." required>
                <button class="input-button"> ＋ Добавить</button>
            </form>
        </div>
     </section>`

  );
}

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
