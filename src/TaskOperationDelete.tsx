import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    taskId: number,
    onRemove: (taskId: number) => void
}

function TaskOperationDelete(props: Props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleRemove = () => {
      setOpen(false);
      props.onRemove(props.taskId);
    };

    return (
        <>
        <ListItemButton onClick={handleClickOpen}>
            <DeleteIcon />
        </ListItemButton>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to remove this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Keep</Button>
            <Button onClick={handleRemove} autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
        </>
      )
}

export default TaskOperationDelete;