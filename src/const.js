
export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK'
};
export const UpdateType={
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};
export const Status = {
  BACKLOG: "backlog",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  RECYCLE_BIN: "recycle-bin",
};

export const StatusLabel = {
  [Status.BACKLOG]: 'Бэклог',
  [Status.IN_PROGRESS]: 'В процессе',
  [Status.COMPLETED]: 'Готово',
  [Status.RECYCLE_BIN]: 'Корзина',
};
