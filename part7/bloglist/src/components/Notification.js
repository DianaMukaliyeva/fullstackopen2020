import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Notification = () => {
  const { message, error } = useSelector((state) => state.notification);

  if (message === '') {
    return null;
  }

  return <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>;
};

export default Notification;
