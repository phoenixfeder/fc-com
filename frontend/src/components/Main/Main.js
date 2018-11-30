import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../Home/Home';
import HelloWorldContainer from "../HelloWorld/helloworld-container";
import EditProfile from "../EditProfile/EditProfile";
import LoginContainer from '../Login/login-container'
import RegisterContainer from "../Register/register-container";
import VerfiyContainer from '../Verify/verify-container';
import FAQ from '../FAQ/FAQ';
import LogoutContainer from '../Logout/logout-container';

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/register' component={RegisterContainer}/>
                    <Route path='/faq' component={FAQ}/>
                    <Route path='/helloworld' component={HelloWorldContainer}/>
                    <Route path='/edit' component={EditProfile}/>
                    <Route path='/login' component={LoginContainer}/>
                    <Route path='/verify' component={VerfiyContainer} />
                    <Route path='/logout' component={LogoutContainer} />
                </Switch>
            </div>
        );
    }
}

export default Main;