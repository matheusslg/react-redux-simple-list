import { createSlice, createAsyncThunk, isAnyOf, current } from '@reduxjs/toolkit';

/** Services */
import UserService from '../../services/user';

const initialState = { fetched: false, data: [], singleUser: {}, error: null };

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await UserService.getUsers();
  return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async payload => {
  const response = await UserService.getUserById(payload);
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async payload => {
  const response = await UserService.addNewUser(payload);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async payload => {
  const { userId, userDataValues } = payload;
  const response = await UserService.updateUser(userId, userDataValues);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async payload => {
  await UserService.deleteUser(payload);
  return payload;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    // Get all users
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload,
      fetched: true,
    }));

    // Get single user by ID
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => ({
      ...state,
      singleUser: payload,
      fetched: true,
    }));

    // Add user
    builder.addCase(addUser.fulfilled, (state, { payload: newUserData }) => {
      const { data } = current(state);
      return {
        ...state,
        data: [...data, newUserData],
        fetched: true,
      };
    });

    // Update user
    builder.addCase(updateUser.fulfilled, (state, { payload: userDataUpdated }) => {
      const { data } = current(state);
      return {
        ...state,
        data: data.map(user => (user.id === userDataUpdated.id ? { ...user, ...userDataUpdated } : user)),
        fetched: true,
      };
    });

    // Delete user
    builder.addCase(deleteUser.fulfilled, (state, { payload: userId }) => {
      const { data } = current(state);
      return {
        ...state,
        data: data.filter(user => user.id !== userId),
        fetched: true,
      };
    });

    // Handle 'fetched' value pending for every async thunk functions
    builder.addMatcher(
      isAnyOf(fetchUsers.pending, fetchUserById.pending, addUser.pending, updateUser.pending, deleteUser.pending),
      state => ({
        ...state,
        fetched: false,
      })
    );

    // Handle 'fetched' value rejected(error) for every async thunk function
    builder.addMatcher(
      isAnyOf(fetchUsers.rejected, fetchUserById.rejected, addUser.rejected, updateUser.rejected, deleteUser.rejected),
      (state, { error }) => ({
        ...state,
        fetched: true,
        error,
      })
    );
  },
  // extraReducers: {
  //   [fetchUsers.pending]: state => {
  //     state.fetched = false;
  //   },
  //   [fetchUsers.fulfilled]: (state, action) => {
  //     state.data = action.payload;
  //   },
  //   [fetchUsers.rejected]: (state, action) => {
  //     state.error = action.error;
  //   },
  // },
});

export default usersSlice.reducer;
