import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS";
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";

export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TaskStateType = {};

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            const copyState = {...state};
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskID);
            return copyState;
        }
        case ADD_TASK: {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            return {
                ...state,
                [action.todoListID] : [newTask, ...state[action.todoListID]]
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todoListID] : state[action.todoListID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todoListID] : state[action.todoListID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD_TODOLIST":
            return {...state, [action.todoListId]: []};
        case "REMOVE_TODOLIST": {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state
    }
};

export const removeTaskAC = (taskID: string, todoListID: string) => {
    return {type: REMOVE_TASK, taskID: taskID, todoListID: todoListID} as const
};

export const addTaskAC = (title: string, todoListID: string) => {
    return {type: ADD_TASK, title, todoListID} as const
};

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
    return {type: CHANGE_TASK_STATUS, taskID, isDone, todoListID} as const
};

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
    return {type: CHANGE_TASK_TITLE, taskID, title, todoListID} as const
};
