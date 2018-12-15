import React from 'react';
import PropTypes from 'prop-types';

export function connect(mapStateToProps, mappedActions) {
  return function (Cmp) {
    const ConnectWrapper = function (props, { store }) {
      const mappedStoreActions = Object.keys(mappedActions).reduce((acc, currKey) => {
        acc[currKey] = (...data) => store.dispatch(mappedActions[currKey](...data));
        return acc;
      }, {});
      const storeProps = mapStateToProps(store.getState());
      return <Cmp {...props} {...storeProps} {...mappedStoreActions} />;
    };
    ConnectWrapper.contextTypes = {
      store: PropTypes.object
    };
    return ConnectWrapper;
  }
}