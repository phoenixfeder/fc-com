import React from 'react';
import PropTypes from 'prop-types';
import Home from './Home/Home';
import Dashboard from './Dashboard/dashboard-container';

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
