import PropTypes from 'prop-types';
import React from 'react';
import Dashboard from './Dashboard/dashboard-container';
import Home from './Home/Home';

function Startpage(props) {

  if (props.isAuthenticated) {
    return <Dashboard />;
  }

  return <Home />;
}

Startpage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default (Startpage);
