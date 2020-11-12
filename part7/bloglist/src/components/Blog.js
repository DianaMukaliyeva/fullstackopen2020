import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeBlog, updateBlog } from '../reducers/blogReducer';
import { addComment } from '../reducers/blogReducer';

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const deleteButtonStyle = {
    backgroundColor: 'blue',
    borderRadius: '5px',
  };

  const likeBlog = () => {
    dispatch(
      updateBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    );
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, blog));
  };

  if (!blog) return null;

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes} <button onClick={likeBlog}>like</button>
      </div>
      added by {blog.user.name ? blog.user.name : blog.user.username}
      {user && blog.user.username === user.username && (
        <button style={deleteButtonStyle} onClick={deleteBlog}>
          remove
        </button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input name="comment" value={comment} onChange={handleChange}></input>
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
