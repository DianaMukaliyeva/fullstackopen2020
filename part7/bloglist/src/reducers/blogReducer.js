import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const initialState = [];

const blogReducer = (state = initialState, action) => {
  const { data, type } = action;

  switch (type) {
    case 'INIT_BLOGS':
      return data;
    case 'CREATE_BLOG':
      return [...state, data];
    default:
      return state;
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  } catch (e) {
    dispatch(setNotification('Could not get blogs, check if server is running', true));
  }
};

export const createBlog = (newBlog) => async (dispatch) => {
  try {
    const createdBlog = await blogService.create(newBlog);
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog,
    });
    dispatch(setNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`));
  } catch (e) {
    dispatch(setNotification('Could not create blog, check fields', true));
  }
};

export default blogReducer;
