import React from 'react';
import PropTypes from 'prop-types';

class Provider extends React.Component {
  storeUnsubscribe = null;

  componentDidMount() {
    this.storeUnsubscribe = this.props.store.subscribe(() => { this.forceUpdate(); });
  }

  componentWillUnmount() {
    if (!this.storeUnsubscribe) { return; }
    this.storeUnsubscribe();
  }

  getChildContext() {
    const { store } = this.props;
    return {
      store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired
};

Provider.childContextTypes = {
  store: PropTypes.object
};

export default Provider;