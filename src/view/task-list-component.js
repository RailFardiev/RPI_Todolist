import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(listname, status) {
  return (
    `<ul class="task-board ${status}">
      <h2>${listname}</h3>
      <ul class="task-list__tasks"></ul>
    </ul>`
  );
}

export default class TaskListComponent extends AbstractComponent {
  constructor(listname, status, onTaskDrop) {
    super();
    this.listname = listname;
    this.status = status;
    this.onTaskDrop = onTaskDrop;
    this.#setDropHandler();
  }

  get template() {
    return createTaskListComponentTemplate(this.listname, this.status);
  }

  #setDropHandler() {
    const container = this.element.querySelector('.task-list__tasks');
    
    
    let targetIndex = null;

    
    container.addEventListener('dragover', (event) => {
      event.preventDefault();

      const targetElement = event.target.closest('.task-item');
      if (targetElement) {
        const taskList = Array.from(container.children);
        targetIndex = taskList.indexOf(targetElement);
        
        
        taskList.forEach(task => task.classList.remove('drag-over'));
        targetElement.classList.add('drag-over');
      } else {
        
        targetIndex = 0;
      }
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      
      
      container.querySelectorAll('.task-item').forEach(task => task.classList.remove('drag-over'));

     
      if (this.onTaskDrop && taskId && targetIndex !== null) {
        this.onTaskDrop(taskId, this.status, targetIndex);
      }
    });
  }
}
