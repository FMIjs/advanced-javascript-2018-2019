// Even though we are not using the React varaible at all it's necessary to import
// it because we need to make sure that whenever webpack is bundling the project 
// it will include the react lib before this file
import React from 'react';
import { Consumer } from '../../newContextApi';
import './styles.css'

const CounterValue = props => (
  <Consumer>{(context) => {
    console.log('Counter Value', context)
    return (
      <div className="counter-value">{props.children}</div>
    );
  }}</Consumer>
);


export default CounterValue;