import { AbstractComponent } from '../framework/view/abstract-component.js';

function createButtonComponentTemplate() {
  return (
    `<button class="reset-button">× Очистить</button>`
  );
}

export default class ButtonComponent extends AbstractComponent {
  get template() {
    return createButtonComponentTemplate();
  }
}
