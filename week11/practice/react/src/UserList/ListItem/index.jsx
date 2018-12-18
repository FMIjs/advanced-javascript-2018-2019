import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ListItem = ({ user, deleteHandler, editHandler, editLabel, deleteLabel }) => (
  <div className="list-item">
    <div>{user.email}</div>
    {editHandler && <button onClick={editHandler}>{editLabel}</button>}
    {deleteHandler && <button onClick={deleteHandler}>{deleteLabel}</button>}
  </div>
);

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func,
  deleteLabel: PropTypes.string,
  editHandler: PropTypes.func,
  editLabel: PropTypes.string,
};

export default ListItem;