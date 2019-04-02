import React from 'react';
import Notifier from '../../utils/Notifier';
import HeaderContainer from '../header/header/header-container';
import MainContainer from '../Main/main-container';

const App = () => (
  <div>
    <Notifier />
    <HeaderContainer />
    <MainContainer />
  </div>
);

export default App;
