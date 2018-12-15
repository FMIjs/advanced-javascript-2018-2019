import React from 'react';
import Counter from './Counter';
import UserList from './UserList';
// import Provider from './store/Provider';
import { Provider } from 'react-redux';
import { store } from './store'
import AppCustomContextProvider, { Provider as CustomProvider } from './newContextApi';

import { BrowserRouter, Link, Route } from 'react-router-dom';

// One way to use our custom context is to just set the value in the app component
// by replacing AppCustomContextProvider with <CustomProvider value={{ apiUrl: 'https://google.com/' }}>
// but it is always better to delegate this logic to another component that will
// handle the context value change

const App = () => (
  <Provider store={store}>
    <AppCustomContextProvider>
      <BrowserRouter>
        <div>
          <nav>
            <Link to="">Counter</Link>
            <Link to="/users">User List</Link>
          </nav>
          <Route path="" exact component={Counter} />
          <Route path="/users" component={UserList} />
        </div>
      </BrowserRouter>
    </AppCustomContextProvider>
  </Provider>
);


export default App;