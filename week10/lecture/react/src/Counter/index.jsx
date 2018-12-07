import React from 'react';
import CounterValue from './CounterValue';

// React stateful Component
class Counter extends React.Component {

  state = {
    counter: 0
  };

  // Since we are using the @babel/plugin-proposal-class-properties 
  // we don't event need the constructor() but it's here just to show
  // how it would be used if there was no @babel/plugin-proposal-class-properties :)
  constructor() {
    super(); // Don't forget to call super!

    // the old way of setting state if you don't have 
    // @babel/plugin-proposal-class-properties 
    // added to your webpack.config
    // 
    // this.state = {
    //   counter: 0
    // };

    // this is the old way of binding functions 
    // currently we are using arrow functions as class properties
    // somewhere you may see that the method is being binded inside the render method
    // but this is not good practice since render is called multiple times and the functions
    // has to be binded only once
    this.increment = this.increment.bind(this);
  }

  increment() {
    // Since we are using a value from the previous state we should ALWAYS use a function to set the new state
    // because setState is async and this.state.counter may not me the value that we want for the operation
    // this.setState({ counter: ++this.state.counter })
    this.setState(prevState => {
      return {
        counter: ++prevState.counter
      }
    });
  }

  decrement = () => {
    this.setState(({ counter }) => ({ counter: --counter }));
  }

  render() {
    const { counter } = this.state;
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

export default Counter;