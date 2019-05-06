import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import EditProfileContainer from '../EditProfile/EditProfile-container';
import FAQ from '../FAQ/FAQ';
import FlashcardOverviewContainer from '../Flashcard_Overview/FlashcardOverview-container';
import FlashcardboxesContainer from '../Flashcardboxes/flashcardboxes-container';
import Home from '../Home/Home';
import LoginContainer from '../Login/login-container';
import LogoutContainer from '../Logout/logout-container';
import RegisterContainer from '../Register/register-container';
import VerfiyContainer from '../Verify/verify-container';

class Main extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/faq" component={FAQ} />
        <Route path="/verify" component={VerfiyContainer} />
        <Route component={Home} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/logout" component={LogoutContainer} />
          <Route path="/edit" component={EditProfileContainer} />
          <Route path="/faq" component={FAQ} />
          <Route path="/boxes" component={FlashcardboxesContainer} />
          <Route path="/flashcards" component={FlashcardOverviewContainer} />
          <Route component={Home} />
        </Switch>
      );
    }

    return (
      <div>
        {routes}
      </div>
    );
  }
}

Main.propTypes = {
  onTryAutoSignup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Main;
