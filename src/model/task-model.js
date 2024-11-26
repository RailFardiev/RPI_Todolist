import {UserAction,UpdateType, Status, StatusLabel} from '../const.js';
import Observable from '../framework/observable.js';
import { generateTaskId } from '../utils.js';

export default class TasksModel extends Observable {
  #boardtasks = [];
  #observers = [];

  tasksApiService = null;
  constructor({ tasksApiService }) {
    super();
    this.tasksApiService = tasksApiService;


    this.tasksApiService.tasks.then((tasks) => {
    });
  }
  async init() {
    try {
      const tasks = await this.tasksApiService.tasks;
      this.#boardtasks = this.#groupTasksByStatus(tasks);
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }


  get tasks() {
    return this.#boardtasks;
  }
  #groupTasksByStatus(tasks) {
    const groupedTasks = {
      [Status.BACKLOG]: { 
        title: StatusLabel[Status.BACKLOG], 
        status: Status.BACKLOG, 
        tasks: [] 
      },
      [Status.IN_PROGRESS]: { 
        title: StatusLabel[Status.IN_PROGRESS], 
        status: Status.IN_PROGRESS, 
        tasks: [] 
      },
      [Status.COMPLETED]: { 
        title: StatusLabel[Status.COMPLETED], 
        status: Status.COMPLETED, 
        tasks: [] 
      },
      [Status.RECYCLE_BIN]: { 
        title: StatusLabel[Status.RECYCLE_BIN], 
        status: Status.RECYCLE_BIN, 
        tasks: [] 
      },
    };
  
    tasks.forEach(task => {
      const group = groupedTasks[task.status];
      if (group) {
        group.tasks.push({ id: task.id, name: task.title });
      }
    });
  
    return groupedTasks;
  }
  
  async addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateTaskId(),
    };
    try {

      const createdTask = await this.tasksApiService.addTask(newTask);

      const newBacklogTask = {
        id: createdTask.id,
        name: createdTask.title
      };
      this.#boardtasks.backlog.tasks.push(newBacklogTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }
 
  deleteTask(taskId){
    for (const groupName in this.#boardtasks) {
      taskGroup = this.#boardtasks[groupName];
      const foundTask = taskGroup.tasks.find(t => t.id === taskId);
      if (foundTask) {
        this.#boardtasks[groupName].tasks = this.#boardtasks[groupName].tasks.filter(task=>task.id !== taskId);
        break;
      }
    }
    this._notify(UserAction.DELETE_TASK, {id:taskId});
  }
  async clearBasketTasks(){
    const basketTasks =this.#boardtasks["recycle-bin"].tasks;
    try{
      await Promise.all(basketTasks.map(task=>this.tasksApiService.deleteTask(task.id)));
      this.#boardtasks["recycle-bin"].tasks=[];
      this._notify(UserAction.DELETE_TASK, {status: "recycle-bin" });
    }catch (err){
      console.error('Ошибка при удалении задач из корзины на сервере', err);
      throw err;
    }
  }
  emptyBasketTasks(){
    return this.#boardtasks["recycle-bin"].tasks.length===0;
  }
  async updateTaskStatus(taskId, newStatus,newIndex){
    console.log(this.#boardtasks);
    let task = null;
    let taskGroup = null;
    for (const groupName in this.#boardtasks) {
      taskGroup = this.#boardtasks[groupName];
      const foundTask = taskGroup.tasks.find(t => t.id === taskId);
      if (foundTask) {
        console.log(`Задача с id ${taskId} найдена в группе: ${taskGroup}`);
        task = foundTask;
        break;
      }
    }

    
    if(task){
      
      taskGroup.tasks = taskGroup.tasks.filter(t => t.id !== taskId);
      let newGroup = null;
      for (const groupName in this.#boardtasks) {
        newGroup = this.#boardtasks[groupName];
        if (newGroup.status==newStatus) {
          break;
        }
      }
        if (newIndex >= 0 && newIndex < newGroup.tasks.length) {
          newGroup.tasks.splice(newIndex, 0, task);
        } else {
          newGroup.tasks.push(task);
        }

        task.status = newStatus;

      try{
        const updateTask= await this.tasksApiService.updateTask(task);
        Object.assign(task,updateTask);
        this._notify(UserAction.UPDATE_TASK,task);
      }catch (err){
        console.error('Ошибка при обновлении статуса задачина сервер',err);
        task.status =previousStatus;
        throw err;

      }
    }
  }
  }


