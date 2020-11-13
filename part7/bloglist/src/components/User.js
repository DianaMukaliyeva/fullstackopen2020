import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const User = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h2 className="pt-3">{user.name}</h2>
      <p>
        <strong>Added blogs:</strong>
      </p>
      <ListGroup>
        {user.blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <ListGroup.Item variant="info" key={blog.id}>
              {blog.title}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
