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
    dispatch(setNotification('Could not get users, check if server is running', true));
  }
};

export default usersReducer;
