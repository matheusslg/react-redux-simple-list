import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

/** Actions */
import { toastMessage } from '../../../../app/ducks/toast';
import { deleteUser } from '../../../../app/ducks/users';

const DeleteUserDialog = forwardRef(({ userData }, ref) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    show() {
      handleClickOpen();
    },
  }));

  const handleDeleteUser = () => {
    dispatch(deleteUser(userData.id));
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
