import React, {Component} from 'react';
import HeaderContainer from '../header/header/header-container';
import MainContainer from '../Main/main-container';
import Notifier from "../../utils/Notifier";

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