import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';

/** Actions */
import { clearToast } from '../../app/ducks/toast';

const Toast = () => {
  const { message, open } = useSelector(state => state.toast);
  const dispatch = useDispatch();

  /**
   * Handle the alert closure event
   */
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(clearToast());
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
