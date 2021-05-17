import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import EditableSpan from "./EditableSpan";
import {TaskType} from "./AppWithRedux";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((
    {
        task,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    }: TaskPropsType) => {

    console.log("Task rendered");

    const removeTaskHandler = () => removeTask(task.id);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    };
    const changeTaskTitleHandler = (newTitle: string) =>
        changeTaskTitle(task.id, newTitle);

    return (
        <li key={task.id} className={task.isDone ? "isDone" : ""}>
            <Checkbox
                color={"secondary"}
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
            />
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
        </li>
    )
});

export default EditableSpan;