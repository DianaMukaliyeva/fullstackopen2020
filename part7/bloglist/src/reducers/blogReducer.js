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
    case 'UPDATE_BLOG':
      return state.map((blog) => (blog.id === data.id ? { ...data } : blog));
    case 'REMOVE_BLOG':
      return state.filter((blog) => (blog.id === data ? false : blog));
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

export const removeBlog = (blogId) => async (dispatch) => {
  try {
    await blogService.remove(blogId);
    dispatch({
      type: 'REMOVE_BLOG',
      data: blogId,
    });
    dispatch(setNotification('blog was successfully deleted'));
  } catch (e) {
    dispatch(setNotification('could not delete this blog', true));
  }
};

export const updateBlog = (blogToUpdate) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.update(blogToUpdate);
    dispatch({
      type: 'UPDATE_BLOG',
      data: blogToUpdate,
    });
    dispatch(setNotification(`you liked blog ${updatedBlog.title} by ${updatedBlog.author}`));
  } catch (e) {
    dispatch(setNotification('some error happened on updating blog', true));
  }
};

export default blogReducer;
