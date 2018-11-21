import React, {Component} from 'react';
import HeaderContainer from '../containers/header/header-container';
import MainContainer from '../containers/main-container';
import Notifier from "../utils/Notifier";

class App extends Component {
    render() {
        return (

            <div>
                <Notifier />
                <HeaderContainer/>
                <MainContainer/>
            </div>

        );
    }

}

export default App;