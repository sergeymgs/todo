import TaskList from "./TaskList";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TasksStorage from "./TasksStorage";

function App() {

  const tasksStorage = new TasksStorage();

  return (
    <>
      <TaskList title="Todo list" storage={tasksStorage} />
    </>
  )
}

export default App
