import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Checkbox} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";

type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export function TodoList(props: TodolistPropsType) {

    const todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists
        .filter(el => el.id === props.todoListID)[0]);
    const tasks2 = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID]);
    const dispatch = useDispatch();

    const addTask = (title: string) => props.addTask(title, props.todoListID);

    const removeTodoList = () => props.removeTodoList(props.todoListID);
    const setAllFilter = () => props.changeTodoListFilter("all", props.todoListID);
    const setActiveFilter = () => props.changeTodoListFilter("active", props.todoListID);
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID);

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.todoListID);
        return (
            <li key={t.id} className={t.isDone ? "isDone" : ""}>
                <Checkbox
                    color={"secondary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
            </li>
        )
    });

    return (
        <div>
            <h3>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setAllFilter}>All</Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setActiveFilter}>Active</Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setCompletedFilter}>Completed</Button>
            </div>
            <ul style={{listStyleType: "none"}}>
                {tasks}
            </ul>
        </div>
    )
}
