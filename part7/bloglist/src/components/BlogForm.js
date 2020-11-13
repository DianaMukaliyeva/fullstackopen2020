import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
    <Form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <Form.Group as={Row}>
        <Form.Label column md="1">
          Title:
        </Form.Label>
        <Col lg="3" sm="5">
          <Form.Control {...title} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="1">
          Author:
        </Form.Label>
        <Col lg="3" sm="5">
          <Form.Control {...author} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="1">
          Url:
        </Form.Label>
        <Col lg="3" sm="5">
          <Form.Control {...url} />
        </Col>
      </Form.Group>
      <Button className="my-1" id="createBlog" type="submit">
        Create
      </Button>
    </Form>
  );
};

BlogForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
};

export default BlogForm;
