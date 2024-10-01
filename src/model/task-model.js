import { tasks } from '../mock/task.js';

export default class TasksModel {
    constructor() {
        this.boardtasks = tasks; 
    }
    getTasks() {
        return this.boardtasks;
    }
}
