const INITIAL_STATE = {
  open: false,
  message: null,
};

/**
 * Types
 */

const Types = {
  SET_TOAST_MESSAGE: 'SET_TOAST_MESSAGE',
  CLEAR_TOAST: 'CLEAR_TOAST',
};

/**
 * Actions
 */

export const toastMessage = message => {
  return {
    type: Types.SET_TOAST_MESSAGE,
    payload: { message },
  };
};

export const clearToast = () => {
  return {
    type: Types.CLEAR_TOAST,
  };
};

/**
 * Reducers
 */

const toast = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SET_TOAST_MESSAGE:
      return {
        ...state,
        open: true,
        message: action.payload.message,
      };
    case Types.CLEAR_TOAST:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default toast;
