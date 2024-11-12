// const.js
import { tasks } from './mock/task.js';

const groupedTasks = tasks.reduce((acc, task) => {
  const status = task.status;
  if (!acc[status]) {
    let title;
    switch (status) {
      case 'backlog':
        title = 'Бэклог';
        break;
      case 'in-progress':
        title = 'В процессе';
        break;
      case 'completed':
        title = 'Готово';
        break;
      case 'recycle-bin':
        title = 'Корзина';
        break;
      default:
        title = status.charAt(0).toUpperCase() + status.slice(1);
    }
    acc[status] = {
      title: title,
      status: status,
      tasks: [],
    };
  }
  // Добавляем и name, и id для каждой задачи
  acc[status].tasks.push({ id: task.id, name: task.title });
  return acc;
}, {});

export const groupedTasksArray = Object.values(groupedTasks);
