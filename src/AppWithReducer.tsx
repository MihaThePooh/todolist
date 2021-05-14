import React, {useReducer, useState} from 'react';
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

function AppWithReducer() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListID_1, title: "make LOVE", filter: "all"},
        {id: todoListID_2, title: "what to buy", filter: "completed"},
    ]);
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "Alice", isDone: true},
            {id: v1(), title: "Leo", isDone: false},
            {id: v1(), title: "Tany", isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Sweets", isDone: true},
        ],
    });

    function removeTask(taskID: string, todoListID: string) {
        dispatchTasks(removeTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchTasks(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatchTodoLists(ChangeTodoListFilterAC(newFilterValue, todoListID))
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        dispatchTodoLists(ChangeTodoListTitleAC(newTitle, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID);
        dispatchTodoLists(action);
        dispatchTasks(action);
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title);
        dispatchTodoLists(action);
        dispatchTasks(action)
    }

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

export default AppWithReducer;

