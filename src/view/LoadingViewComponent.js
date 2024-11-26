import { AbstractComponent } from "../framework/view/abstract-component.js";
function createNoTaskTemplate(){
    return (
    `<p class="board_no_tasks">
    Loadind...
    </p>`
    );
}
export default class LoadindViewComponent extends AbstractComponent{
    get template(){
        return createNoTaskTemplate();
    }
}