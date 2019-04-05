import React from 'react';
import HeaderContainer from '../header/header/header-container';
import MainContainer from '../Main/main-container';
import Notifier from '../../utils/Notifier';

const App = () => (
  <div>
    <Notifier />
    <HeaderContainer />
    <MainContainer />
  </div>
);

export default App;
