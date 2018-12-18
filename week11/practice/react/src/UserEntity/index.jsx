import React from 'react';
import PropTypes from 'prop-types';
import { connectLanguageContext } from '../components/Language';
import { connect } from 'react-redux';
import { saveUser, loadUser, clearSelectedUser } from '../store/actions';
import { compose } from '../utils';

const emptyUser = {
  id: null,
  name: '',
  username: '',
  email: ''
}

class UserEntity extends React.Component {

  componentDidMount() {
    if (this.props.match.path.includes('/add')) { return; }
    const id = this.props.match.params.id;
    this.props.loadUser(id);
  }

  componentWillUnmount() {
    this.props.clearSelectedUser();
  }

  save = () => {
    const updatedUser = {
      id: +this.refs.id.value,
      name: this.refs.name.value,
      email: this.refs.email.value,
      username: this.refs.username.value
    }
    this.props.saveUser(updatedUser, () => {
      this.props.history.push('');
    });
  };

  render() {
    const { translate } = this.props;
    const user = this.props.user || emptyUser;
    return (
      <div>
        <form>
          <input type="hidden" ref="id" defaultValue={user.id} />
          <div className="form-row">
            <label htmlFor="name">{translate('Name')}</label>
            <input id="name" type="text" defaultValue={user.name} ref="name" />
          </div>
          <div className="form-row">
            <label htmlFor="username">{translate('Username')}</label>
            <input id="username" type="text" defaultValue={user.username} ref="username" />
          </div>
          <div className="form-row">
            <label htmlFor="email">{translate('Email')}</label>
            <input id="email" type="text" defaultValue={user.email} ref="email" />
          </div>
          <button type="button" onClick={this.save}>{translate('Save')}</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.entity
  };
}

const mappedActions = {
  saveUser,
  loadUser,
  clearSelectedUser
}

const decorate = compose(
  connect(mapStateToProps, mappedActions),
  connectLanguageContext
);
export default decorate(UserEntity);