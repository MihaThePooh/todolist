import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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

export const TodoList = React.memo((props: TodolistPropsType) => {

    // тут просто показано, что благодаря редаксу и контексту, который он создает, до стора
    // (до данных и до диспача) можно добраться из любой компоненты, если она находится в обертке провайдера
    // const todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists
    //     .filter(el => el.id === props.todoListID)[0]);
    // const tasks2 = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID]);
    // const dispatch = useDispatch();


    // useCallback нужен для предотвращения ненужных повторных перерисовок компоненты.
    // он как бы запомнил, закешировал этот колбэк. если этот колбэк передаётся куда-то через пропсы
    // он не вызывает перерисовку этой компоненты. useCallback сравнивает закэшированный колбэк с колбэком,
    // который в пропсах - колбэк тот же? тогда не перерисовываем компоненту. useCallback принимает 2 параметра:
    // 1 - тот самый отслеживаемый колбэк и 2 - массив зависимостей. все колбэки, которые пробрасываются в
    // дочернюю компоненту, должны оборачиваться useCallback'ом
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props]);

    const removeTodoList = () => props.removeTodoList(props.todoListID);
    const setAllFilter = useCallback(() => props.changeTodoListFilter("all", props.todoListID), [props.changeTodoListFilter, props.todoListID]);
    const setActiveFilter = useCallback(() => props.changeTodoListFilter("active", props.todoListID), [props.changeTodoListFilter, props.todoListID]);
    const setCompletedFilter = useCallback(() => props.changeTodoListFilter("completed", props.todoListID), [props.changeTodoListFilter, props.todoListID]);
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID),[props.changeTodoListTitle, props.todoListID]);

    let tasksForTodoList = props.tasks;
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todoListID),[props.removeTask]);
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) =>
        props.changeTaskStatus(taskId, newIsDoneValue, props.todoListID),[props.changeTaskStatus, props.todoListID]);
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) =>
        props.changeTaskTitle(taskId, newTitle, props.todoListID),[props.changeTaskTitle, props.todoListID]);

    const tasks = tasksForTodoList.map(t => <Task task={t}
                                                  key={t.id}
                                                  removeTask={removeTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  changeTaskTitle={changeTaskTitle}/>);

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
});
