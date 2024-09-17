import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskAreaComponent from './view/task-area-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';


const bodyContainer = document.querySelector('.board-app');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), bodyContainer);
const taskAreaComponent = new TaskAreaComponent();
render(taskAreaComponent, bodyContainer);
for (let i = 0; i < 4; i++) {
    const taskList = new TaskListComponent();
    render(taskList, taskAreaComponent.getElement());
    for (let j = 0; j < 3; j++) {
        render(new TaskComponent(), taskList.getElement());
    }
}
