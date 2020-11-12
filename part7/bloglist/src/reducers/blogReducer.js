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
    const msg =
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : 'something went wrong';
    dispatch(setNotification(msg, true));
  }
};

export const createBlog = (newBlog, resetForm) => async (dispatch) => {
  try {
    const createdBlog = await blogService.create(newBlog);
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog,
    });
    resetForm();
    dispatch(setNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`));
  } catch (e) {
    const msg =
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : 'something went wrong';
    dispatch(setNotification(msg, true));
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
    const msg =
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : 'something went wrong';
    dispatch(setNotification(msg, true));
  }
};

export const addComment = (comment, blog) => async (dispatch) => {
  try {
    await blogService.comment(comment, blog.id);
    const updatedBlog = { ...blog };
    updatedBlog.comments = blog.comments.concat(comment);
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    });
    dispatch(setNotification('comment was successfully added'));
  } catch (e) {
    const msg =
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : 'something went wrong';
    dispatch(setNotification(msg, true));
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
    const msg =
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : 'something went wrong';
    dispatch(setNotification(msg, true));
  }
};

export default blogReducer;
