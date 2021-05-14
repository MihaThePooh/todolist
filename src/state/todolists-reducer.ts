import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD_TODOLIST"
    title: string
    todoListId: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE"
    newTitle: string
    id: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

const initialState: Array<TodoListType> = [];

export const todoListReducer = (todoLists = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id);
        case "ADD_TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            };
            return [newTodoList, ...todoLists];
        case "CHANGE_TODOLIST_TITLE":
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.newTitle;
                return [...todoLists]
            }
            return todoLists;
        case "CHANGE_TODOLIST_FILTER": {
            const todoList = todoLists.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
                return [...todoLists]
            }}
            return todoLists;
        default:
            return todoLists
    }
};

// запись (id: string): RemoveTodoListActionType позволяет типизировать return функции
export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: "REMOVE_TODOLIST", id}
};

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD_TODOLIST", title, todoListId: v1()}
};

export const ChangeTodoListTitleAC = (newTitle: string, id: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE_TODOLIST_TITLE", newTitle, id}
};

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE_TODOLIST_FILTER", id, filter}
};