import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const initialState = null;

const userReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'LOGIN':
      window.localStorage.setItem('loggedUser', JSON.stringify(data));
      return data;
    case 'INIT_USER':
      return data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const user = await loginService.login(data);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
    blogService.setToken(user.token);
  } catch (e) {
    const msg =
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : 'something went wrong';
    dispatch(setNotification(msg, true));
  }
};

export const initUser = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    dispatch({
      type: 'INIT_USER',
      data: user,
    });
    blogService.setToken(user.token);
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};

export default userReducer;
