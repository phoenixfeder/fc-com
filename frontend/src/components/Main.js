import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import HelloWorldContainer from "../containers/helloworld-container";
import EditProfile from "./EditProfile";
import Login from './Login'
import RegisterContainer from "../containers/register-container";
import Verfiy from './Verify';

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/register' component={RegisterContainer}/>
                    <Route path='/faq' component={FAQ                    }/>
                    <Route path='/helloworld' component={HelloWorldContainer}/>
                    <Route path='/edit' component={EditProfile}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/verify' component={Verfiy} />
                </Switch>
            </div>
        );
    }
}

export default Main;