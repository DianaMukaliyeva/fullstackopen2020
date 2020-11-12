import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url');

  const resetForm = () => {
    hideForm();
    title.onReset();
    author.onReset();
    url.onReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createBlog(newBlog, resetForm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title: <input {...title} />
      </div>
      <div>
        author: <input {...author} />
      </div>
      <div>
        url: <input {...url} />
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
