const initialState = { message: '', id: 0 };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { id: action.data.id, message: action.data.message };
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: '' };
    default:
      return state;
  }
};

export const setNotification = (message = '', seconds = 5) => async (dispatch, getState) => {
  clearTimeout(getState().notification.id);
  let id = setTimeout(() => {
    dispatch(clearNotification());
  }, seconds * 1000);
  dispatch({
    type: 'SET_NOTIFICATION',
    data: { message: message, id: id },
  });
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
