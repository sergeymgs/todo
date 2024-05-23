import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
  taskId: number;
  title: string;
  isDone: boolean;
  onSave: (taskId: number, title: string) => void;
}

function TaskTitleEditable(props: Props) {
  const [editable, setEditable] = React.useState(false);

  const [textInputValue, setTextInputValue] = React.useState(props.title);

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInputValue(event.target.value);
  };

  const handleMakeEditable = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    props.onSave(props.taskId, textInputValue);
  };

  const handleCancel = () => {
    setTextInputValue(props.title);
    setEditable(false);
  };

  return (
    <>
      {editable ? (
        <>
          <TextField
            id="standard-basic"
            value={textInputValue}
            onChange={handleTextInputChange}
            variant="standard"
          />
          <ListItemButton onClick={handleSave}>
            <SaveIcon />
          </ListItemButton>
          <ListItemButton onClick={handleCancel}>
            <CancelIcon />
          </ListItemButton>
        </>
      ) : (
        <>
          <ListItemText
            primary={props.title}
            sx={{
              mr: 10,
              ml: 1,
              bgcolor: "background.paper",
              textDecoration: props.isDone ? "line-through" : "none",
            }}
          />
          <ListItemButton onClick={handleMakeEditable}>
            <EditIcon />
          </ListItemButton>
        </>
      )}
    </>
  );
}

export default TaskTitleEditable;
