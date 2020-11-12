import userService from '../services/users';
import { setNotification } from './notificationReducer';

const initialState = [];

const usersReducer = (state = initialState, action) => {
  const { data, type } = action;

  switch (type) {
    case 'GET_USERS':
      return data;
    default:
      return state;
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAll();
    dispatch({
      type: 'GET_USERS',
      data: users,
    });
  } catch (e) {
    const msg =
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : 'something went wrong';
    dispatch(setNotification(msg, true));
  }
};

export default usersReducer;
