import React from 'react';
import Counter from './Counter';
import UserList from './UserList';

// if we want to return multiple items from a component we use an array and for 
// better performance we give each element a key
const App = () => [<Counter key="counter" />, <UserList key="user-list" />];


export default App;