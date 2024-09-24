import { tasks } from '../mock/task.js';

export default class TasksModel {
    constructor() {
        this.boardtasks = tasks; // Убедись, что переменная инициализируется
    }

    getTasks() {
        return this.boardtasks;
    }
}
