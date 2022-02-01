import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

/** Actions */
import { setUsers } from '../../../../app/ducks/users';
import { toastMessage } from '../../../../app/ducks/toast';

const DeleteUserDialog = forwardRef(({ userData }, ref) => {
  const [open, setOpen] = useState(false);
  const { data: users } = useSelector(state => state.users);

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    show() {
      handleClickOpen();
    },
  }));

  const handleDeleteUser = () => {
    const updatedUsers = [...users].filter(user => user.id !== userData.id);
    dispatch(setUsers(updatedUsers));
    dispatch(toastMessage('User deleted successfully!'));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Do you want to delete this user?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The user <strong>{userData.username}</strong> will be deleted permanently, are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleDeleteUser} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DeleteUserDialog;
