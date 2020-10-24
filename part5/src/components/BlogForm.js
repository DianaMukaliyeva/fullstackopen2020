import React, { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addBlog(newBlog);
      }}>
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
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
