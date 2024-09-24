import TaskListComponent from '../view/task-list-component.js'; // Проверьте путь
import TaskComponent from '../view/task-component.js'; // Убедитесь, что он тоже импортирован
import { render } from '../framework/render.js'; // Убедитесь, что это импортировано

export default class TasksBoardPresenter {
    constructor({ boardContainer, tasksModel }) {
        this.boardContainer = boardContainer;
        this.tasksModel = tasksModel;
    }

    init() {
        const tasks = this.tasksModel.getTasks(); // Получаем задачи из модели

        // Создаем массив для статусов
        const statuses = ['backlog', 'in-progress', 'completed', 'recycle-bin'];

        statuses.forEach(status => {
            const taskListComponent = new TaskListComponent({ status }); // Создаем новый компонент списка задач
            render(taskListComponent, this.boardContainer); // Рендерим список задач в контейнере

            tasks.forEach(task => {
                if (task.status === status) {
                    taskListComponent.addTask(task); // Добавляем задачи в соответствующий список
                }
            });
        });
    }
}
