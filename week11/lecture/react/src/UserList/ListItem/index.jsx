import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ListItem = ({ user, deleteHandler, processing }) => (
  <div className="list-item">
    <div>{user.email}</div>
    <button onClick={() => deleteHandler(user.id)}>Delete</button>
    {processing && <div className="processing">Processing ...</div>}
  </div>
);

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired
};

export default ListItem;