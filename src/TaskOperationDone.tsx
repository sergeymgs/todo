import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import ListItemButton from "@mui/material/ListItemButton";

interface Props {
  taskId: number;
  isDone: boolean;
  onChangeState: (taskId: number, isDone: boolean) => void;
}

function TaskOperationDone(props: Props) {
  const handleChangeState = () => {
    props.onChangeState(props.taskId, !props.isDone);
  };

  return (
    <>
      <ListItemButton onClick={handleChangeState}>
        {props.isDone ? <ReplayIcon /> : <CheckIcon />}
      </ListItemButton>
    </>
  );
}

export default TaskOperationDone;
