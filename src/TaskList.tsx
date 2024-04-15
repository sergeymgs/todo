import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TaskOperationDelete from "./TaskOperationDelete";
import TaskOperationDone from "./TaskOperationDone";
import TaskTitleEditable from "./TaskTitleEditable";
import TaskOperationCreate from "./TaskOperationCreate";
import TasksStorage from "./TasksStorage";

type Task = {
    id: number; 
    title: string;
    isDone: boolean;
}

interface Props {
    title: string,
    storage: TasksStorage, // an interface would be better, but i'm lazy
}

function TaskList(props: Props) {

    const [data, setData] = useState<Task[]>([]);

    useEffect(() => {
        const itemsData = props.storage.getItems();
        setData(itemsData);
        props.storage.setItems(itemsData);
    }, []);

    const removeTask = (taskId: number) => {
        let updatedData = data.filter(item => item.id !== taskId)
        setData(updatedData);
        props.storage.setItems(updatedData);
    };

    const changeTaskState = (taskId: number, isDone: boolean) => {
        const updatedData = data.map(item => item)
        const item = updatedData.find((element) => element.id == taskId);
        if (item !== undefined) {
            item.isDone = isDone;
            setData(updatedData);
            props.storage.setItems(updatedData);
        }
    };

    const saveTask = (taskId: number, title: string) => {
        const updatedData = data.map(item => item)
        const item = updatedData.find((element) => element.id == taskId);
        if (item !== undefined) {
            item.title = title;
            setData(updatedData);
            props.storage.setItems(updatedData);
        }
    };

    const createTask = (title: string) => {
        const updatedData = data.map(item => item)
        const maxId = updatedData.reduce(
          (accumulator, item) => Math.max(accumulator, item.id),
          0,
        );

        const task = {id: maxId + 1, title: title, isDone: false};
        updatedData.push(task)
        setData(updatedData);
        props.storage.setItems(updatedData);
    };

    return (
    <>
        <Grid container spacing={2}>
        <Grid item xs={8}>
            <Typography variant="h4" sx={{ ml: 1}} gutterBottom>
            {props.title}
            </Typography>
        </Grid>
        <Grid item xs={4}>
            <TaskOperationCreate onAdd={createTask} />
        </Grid>
        </Grid>

        {data.length ? (

        <List sx={{ bgcolor: 'background.paper' }}>
        {data.map(item => (
            <ListItem key={item.id}>
                <TaskOperationDone onChangeState={changeTaskState} taskId={item.id} isDone={item.isDone} />
                <TaskTitleEditable onSave={saveTask} taskId={item.id} title={item.title} isDone={item.isDone} />
                <TaskOperationDelete onRemove={removeTask} taskId={item.id} />
            </ListItem>
        ))}
        </List>
        ) : (
            <p>No items.</p>
        )}
    </>
    );
}

export default TaskList;