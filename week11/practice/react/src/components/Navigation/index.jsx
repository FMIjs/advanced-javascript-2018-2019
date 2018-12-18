import React from 'react';
import { Link } from 'react-router-dom';
import { connectLanguageContext } from '../Language';

const Navigation = ({ translate }) => (
  <nav>
    <Link to="">{translate('User List')}</Link>
    <Link to="add">{translate('User Add')}</Link>
  </nav>
);

export default connectLanguageContext(Navigation);