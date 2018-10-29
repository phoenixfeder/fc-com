import React, {Component} from 'react';
import HeaderContainer from '../containers/header/header-container';
import MainContainer from '../containers/main-container';

class App extends Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <MainContainer/>
            </div>
        );
    }

}

export default App;