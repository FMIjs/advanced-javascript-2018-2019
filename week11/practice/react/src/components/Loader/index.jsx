import React from 'react';
import './styles.css';

export const Loader = ({ isLoading }) => isLoading && <div id="loader">Loading ...</div>;