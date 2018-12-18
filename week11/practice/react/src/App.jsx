import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import UserList from './UserList';
import UserEntity from './UserEntity';
import Language from './components/Language';
import Navigation from './components/Navigation';

import { Loader } from './components/Loader';

const App = ({ isLoading }) => (
  <BrowserRouter>
    <Language>
      <Navigation />
      <Route path="/:lang/" exact component={UserList} />
      <Route path="/:lang/add" component={UserEntity} />
      <Route path="/:lang/edit/:id" component={UserEntity} />
      <Loader isLoading={isLoading} />
    </Language>
  </BrowserRouter>
);

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading
  };
}

export default connect(mapStateToProps)(App);