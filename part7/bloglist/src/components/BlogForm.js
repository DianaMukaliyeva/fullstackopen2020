import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    hideForm();
    setNewBlog({ title: '', author: '', url: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(newBlog, resetForm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title: <input name="title" value={newBlog.title} onChange={handleBlogChange} />
      </div>
      <div>
        author: <input name="author" value={newBlog.author} onChange={handleBlogChange} />
      </div>
      <div>
        url: <input name="url" value={newBlog.url} onChange={handleBlogChange} />
      </div>
      <button id="createBlog" type="submit">
        create
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
};

export default BlogForm;
