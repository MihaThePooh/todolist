import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Grid} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch]);
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch]);
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch]);
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    }, [dispatch]);
    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(newFilterValue, todoListID))
    }, [dispatch]);
    const changeTodoListTitle = useCallback((newTitle: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, todoListID))
    }, [dispatch]);
    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID);
        dispatch(action);
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title);
        dispatch(action);
    }, [dispatch]);

    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <TodoList
                        removeTodoList={removeTodoList}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

