import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { loadUsers } from '../store/actions';
import { connect } from 'react-redux';
import { connectLanguageContext } from '../components/Language';
import { compose } from '../utils';

class UserList extends React.Component {

  componentDidMount() {
    if (!this.props.shouldLoadList) { return; }
    this.props.loadUsers();
  }

  editUserHandlerFactory = (user) => {
    return () => {
      this.props.history.push(`edit/${user.id}`);
    }
  }

  render() {
    const { list, translate } = this.props;

    return <div>
      <div>{translate('User List')}</div>
      <div className="user-list-container">
        {list.length > 0 ? list.map((user, index) => (
          <ListItem
            key={index}
            user={user}
            editHandler={this.editUserHandlerFactory(user)}
            editLabel={translate('Edit')}
          />
        )) : <div>No Users</div>}
      </div>
    </div>;
  }
}

UserList.propTypes = {
  list: PropTypes.array
}

function mapStateToProps(state) {
  return {
    list: state.list,
    shouldLoadList: state.shouldLoadList
  }
}

const mappedActions = {
  loadUsers: loadUsers
};

const decorate = compose(
  connect(mapStateToProps, mappedActions),
  connectLanguageContext
)

export default decorate(UserList);
