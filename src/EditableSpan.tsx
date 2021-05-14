import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState(props.title);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false);
        props.changeTitle(title)
    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onEnter = (e: any) => {
        if(e.key === 'Enter') {
            setEditMode(false);
            props.changeTitle(title)
        }
    };


    return (
        editMode
            ? <TextField
                variant={"standard"}
                color={"secondary"}
                value={title}
                onChange={changeTitle}
                onBlur={offEditMode}
                autoFocus
                onKeyPress={onEnter}
            />
            : <span onClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;