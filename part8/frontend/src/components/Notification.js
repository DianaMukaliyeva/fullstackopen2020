import React from 'react';

const Notification = ({ message }) => {
  if (!message.content) {
    return null;
  }

  return (
    <div
      style={{
        color: message.error ? 'red' : 'green',
        border: message.error ? '1px solid red' : '1px solid green',
        margin: '5px',
        padding: '5px',
      }}>
      {message.content}
    </div>
  );
};

export default Notification;
