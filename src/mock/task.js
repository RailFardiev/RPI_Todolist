import { Status } from '../const.js';

export const tasks = [
    {
        id: `1`,
        title: `Выучить JS`,
        status: Status.BACKLOG,
    },
    {
        id: `2`,
        title: `Сделать домашку`,
        status: Status.BACKLOG,
    },
    {
        id: `3`,
        title: `Выучить React`,
        status: Status.BACKLOG,
    },
    {
        id: `4`,
        title: `Выпить смузи`,
        status: Status.IN_PROGRESS,
    },
    {
        id: `5`,
        title: `Попить воды`,
        status: Status.IN_PROGRESS,
    },
    {
        id: `6`,
        title: `Позвонить маме`,
        status: Status.COMPLETED,
    },
    {
        id: `7`,
        title: `Погладить кота`,
        status: Status.COMPLETED,
    },
    {
        id: `8`,
        title: `Сходить погулять`,
        status: Status.RECYCLE_BIN,
    },
    {
        id: `9`,
        title: `Прочитать войну и мир`,
        status: Status.RECYCLE_BIN,
    },
];
