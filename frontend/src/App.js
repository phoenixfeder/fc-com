import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to FlashCardCommunity! Unfortunately not a lot to see here<em>, yet!</em></p>
        </header>
      </div>
    );
  }
}

export default App;
