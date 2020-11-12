const initialState = { message: '', error: false, id: 0 };

const notificationReducer = (state = initialState, action) => {
  const { data, type } = action;

  switch (type) {
    case 'SET_NOTIFICATION':
      return { error: data.error, message: data.message, id: data.id };
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: '' };
    default:
      return state;
  }
};

export const setNotification = (message = '', error = false, seconds = 5) => async (
  dispatch,
  getState
) => {
  clearTimeout(getState().notification.id);
  let id = setTimeout(() => {
    dispatch(clearNotification());
  }, seconds * 1000);
  dispatch({
    type: 'SET_NOTIFICATION',
    data: { message: message, id: id, error: error },
  });
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
