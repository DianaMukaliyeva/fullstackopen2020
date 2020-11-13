import React from 'react';
import { Form, Button, Col, ListGroup } from 'react-bootstrap';
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
      <h3 className="pt-5 pl-3">Comments</h3>
      <Form onSubmit={handleSubmit}>
        <Col className="p-3" lg="5" sm="6">
          <Form.Control {...comment}></Form.Control>
        </Col>
        <Col lg="5" sm="6">
          <Button>add comment</Button>
        </Col>
      </Form>
      <ListGroup className="pt-3">
        {blog.comments.map((comment, index) => (
          <ListGroup.Item variant="info" key={index}>
            {comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Comments;
