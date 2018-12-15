import React from 'react';
import PropTypes from 'prop-types';
import CounterValue from './CounterValue';
import { connect } from 'react-redux';
import { connectCustomContext } from '../newContextApi';
import { compose } from '../utils';

// import { connect } from '../store/connect';
import { increment, decrement } from './store/actions';

class Counter extends React.Component {

  increment = () => {
    this.props.increment();
  }

  decrement = () => {
    this.props.decrement();
  }

  render() {
    const { counter } = this.props;

    return (
      <div>
        <CounterValue>{counter}</CounterValue>
        <div>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
        </div>
      </div>
    )
  }
}

Counter.contextTypes = {
  store: PropTypes.object
};

function mapStateToProps(state) {
  return {
    counter: state.counter.value
  };
}

const mappedActions = {
  increment,
  decrement
}

// The line bellow looks O.K for now but we can make sure that will look better
// export default connectCustomContext(connect(mapStateToProps, mappedActions)(Counter));
// so we can replace it with
const decorate = compose(
  connectCustomContext,
  connect(mapStateToProps, mappedActions)
);

export default decorate(Counter);