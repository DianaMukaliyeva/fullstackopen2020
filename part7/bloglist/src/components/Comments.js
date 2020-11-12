import React from 'react';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const comment = useField('text', 'comment');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(comment.value, blog));
    comment.onReset();
  };

  return (
    <>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input {...comment}></input>
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
