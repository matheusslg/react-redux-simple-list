import { configureStore } from '@reduxjs/toolkit';

/** Reducers */
import usersReducer from './ducks/users';
import toastReducer from './ducks/toast';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    toast: toastReducer
  },
});
