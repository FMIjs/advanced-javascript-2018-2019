// Even though we are not using the React varaible at all it's necessary to import
// it because we need to make sure that whenever webpack is bundling the project 
// it will include the react lib before this file
import React from 'react';
import './styles.css'

const CounterValue = props =>
  <div className="counter-value">{props.children}</div>

export default CounterValue;