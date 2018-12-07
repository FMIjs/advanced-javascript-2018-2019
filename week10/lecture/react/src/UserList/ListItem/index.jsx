import React from 'react';
import './styles.css';

const ListItem = ({ user, deleteHandler, processing }) => (
  <div className="list-item">
    <div>{user.email}</div>
    <button onClick={() => deleteHandler(user.id)}>Delete</button>
    {processing && <div className="processing">Processing ...</div>}
  </div>
);

export default ListItem;