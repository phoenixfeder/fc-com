import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as PropTypes from 'prop-types';

const propTypes = {
  onLogout: PropTypes.func.isRequired,
};
class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = propTypes;

export default Logout;
