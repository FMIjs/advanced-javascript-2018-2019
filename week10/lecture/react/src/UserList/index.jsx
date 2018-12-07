import React from 'react';
import ListItem from './ListItem';

import { apiURL } from '../constants';

class UserList extends React.Component {

  state = {
    isContentLoaded: false,
    processingUserIds: [],
    users: null
  };

  componentDidMount() {
    fetch(`${apiURL}/users`)
      .then(res => res.json())
      .then(users => {
        this.setState({ users, isContentLoaded: true });
      });
  }

  deleteUser = userId => {
    // we are going to have a fetch call to the server here instead of setTimeout
    setTimeout(() => {
      this.setState(({ users, processingUserIds }) => ({
        users: users.filter(({ id }) => id !== userId),
        processingUserIds: processingUserIds.filter(id => id !== userId)
      }));
    }, 5000);
    this.setState(({ processingUserIds }) => ({ processingUserIds: processingUserIds.concat(userId) }));
  }

  render() {
    const { users, isContentLoaded, processingUserIds } = this.state;
    return isContentLoaded ? <div>
      <div>User List</div>
      <div className="user-list-container">
        {users.length > 0 ? users.map((user, index) => (
          <ListItem
            key={index}
            user={user}
            deleteHandler={this.deleteUser}
            processing={processingUserIds.includes(user.id)}
          />
        )) : <div>No Users</div>}
      </div>
    </div> : <div>Loading ...</div>;
  }
}

export default UserList;
