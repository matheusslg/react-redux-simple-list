/** Services */
import { getUsers } from "../../services/users";

const INITIAL_STATE = {
  fetched: false,
  data: [],
  error: null,
};

/**
 * Types
 */

const Types = {
  FETCH_USERS_PENDING: "FETCH_USERS_PENDING",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR: "FETCH_USERS_ERROR",
  SET_USERS: "SET_USERS",
};

/**
 * Actions
 */

const fetchUsersPending = () => {
  return {
    type: Types.FETCH_USERS_PENDING,
  };
};

const fetchUsersSuccess = () => {
  return {
    type: Types.FETCH_USERS_SUCCESS,
  };
};

const fetchUsersError = (error) => {
  return {
    type: Types.FETCH_USERS_ERROR,
    payload: { error },
  };
};

export const setUsers = (users) => {
  return {
    type: Types.SET_USERS,
    payload: { users },
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchUsersPending());
      const { data } = await getUsers();
      dispatch(setUsers(data));
      dispatch(fetchUsersSuccess());
    } catch (error) {
      console.log(error);
      dispatch(fetchUsersError(error));
    }
  };
};

/**
 * Reducers
 */

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_USERS_PENDING:
      return { ...state, fetched: false };
    case Types.FETCH_USERS_SUCCESS:
      return { ...state, fetched: true };
    case Types.FETCH_USERS_ERROR:
      return { ...state, error: action.payload.error };
    case Types.SET_USERS:
      return { ...state, data: action.payload.users };
    default:
      return state;
  }
};

export default users;
