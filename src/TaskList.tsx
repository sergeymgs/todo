import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TaskOperationDelete from "./TaskOperationDelete";
import TaskOperationDone from "./TaskOperationDone";
import TaskTitleEditable from "./TaskTitleEditable";
import TaskOperationCreate from "./TaskOperationCreate";
import axios from "axios";

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

interface Props {
  title: string;
}

function TaskList(props: Props) {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL_TASKS);
      const itemsData = response.data;
      setData(itemsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removeTask = (taskId: number) => {
    axios
      .delete(import.meta.env.VITE_API_URL_TASKS + "/" + taskId)
      .then(function () {
        let updatedData = data.filter((item) => item.id !== taskId);
        setData(updatedData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTaskByIdFromState = (taskId: number) => {
    return data.find((element) => element.id == taskId);
  };

  const changeTaskState = (taskId: number, isDone: boolean) => {
    const task = getTaskByIdFromState(taskId);
    if (task) {
      task.isDone = isDone;
      updateTask(task);
    }
  };

  const saveTask = (taskId: number, title: string) => {
    const task = getTaskByIdFromState(taskId);
    if (task) {
      task.title = title;
      updateTask(task);
    }
  };

  const updateTask = (task: Task) => {
    axios
      .put(import.meta.env.VITE_API_URL_TASKS + "/" + task.id, task)
      .then(function () {
        setData([...data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createTask = async (title: string) => {
    const updatedData = data.map((item) => item);
    const maxId = updatedData.reduce(
      (accumulator, item) => Math.max(accumulator, item.id),
      0
    );

    const task = { id: maxId + 1, title: title, isDone: false };

    axios
      .post(import.meta.env.VITE_API_URL_TASKS, task)
      .then(function (response) {
        const createdTask = response.data[0];
        updatedData.push(createdTask);
        setData(updatedData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" sx={{ ml: 1 }} gutterBottom>
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TaskOperationCreate onAdd={createTask} />
        </Grid>
      </Grid>

      {data.length ? (
        <List sx={{ bgcolor: "background.paper" }}>
          {data.map((item) => (
            <ListItem key={item.id}>
              <TaskOperationDone
                onChangeState={changeTaskState}
                taskId={item.id}
                isDone={item.isDone}
              />
              <TaskTitleEditable
                onSave={saveTask}
                taskId={item.id}
                title={item.title}
                isDone={item.isDone}
              />
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
