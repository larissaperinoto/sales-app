import React from 'react';
import './message.css';

export const Message = ({ message, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{message}</p>
    </div>
  );
};
