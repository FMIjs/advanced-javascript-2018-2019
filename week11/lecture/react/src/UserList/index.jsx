import React from 'react';
import ListItem from './ListItem';
import { loadUsers } from './store/actions';
import { connect } from 'react-redux';
import { customContext } from '../newContextApi';

class UserList extends React.Component {

  static contextType = customContext; // Another way to connect the new context api to the component

  componentDidMount() {
    this.props.loadUsers();
  }

  // deleteUser = userId => {
  //   // we are going to have a fetch call to the server here instead of setTimeout
  //   setTimeout(() => {
  //     this.setState(({ users, processingUserIds }) => ({
  //       users: users.filter(({ id }) => id !== userId),
  //       processingUserIds: processingUserIds.filter(id => id !== userId)
  //     }));
  //   }, 5000);
  //   this.setState(({ processingUserIds }) => ({ processingUserIds: processingUserIds.concat(userId) }));
  // }

  render() {
    const { list, isLoading } = this.props;
    console.log('User List', this.context);
    // const { users, isContentLoaded, processingUserIds } = this.state;

    return !isLoading ? <div>
      <div>User List</div>
      <div className="user-list-container">
        {list.length > 0 ? list.map((user, index) => (
          <ListItem
            key={index}
            user={user}
          // deleteHandler={this.deleteUser}
          // processing={processingUserIds.includes(user.id)}
          />
        )) : <div>No Users</div>}
      </div>
    </div> : <div>Loading ...</div>;
  }
}

function mapStateToProps(state) {
  return {
    list: state.users.list,
    isLoading: state.users.isLoading,
    editUser: state.users.list.filter(user => user.id === 1)
  }
}

const mappedActions = {
  loadUsers
};

export default connect(mapStateToProps, mappedActions)(UserList);
