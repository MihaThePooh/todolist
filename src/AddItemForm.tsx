import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    console.log("AddItemForm rendered");

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false)
    };
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    };
    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    };

    return (
        <div>
            <TextField
                variant={"outlined"}
                label={"title"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                error={error}
                helperText={error && "title is required"}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})

export default AddItemForm