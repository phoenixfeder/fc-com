import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import HelloWorldContainer from "../HelloWorld/helloworld-container";
import LoginContainer from '../Login/login-container'
import RegisterContainer from "../Register/register-container";
import VerfiyContainer from '../Verify/verify-container';
import FAQ from '../FAQ/FAQ';
import LogoutContainer from '../Logout/logout-container';
import EditProfileContainer from "../EditProfile/EditProfile-container";

class Main extends Component {
    
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    
    
    render() {

        let routes = (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={LoginContainer} />
                <Route path='/register' component={RegisterContainer} />
                <Route path='/faq' component={FAQ} />
                <Route path='/helloworld' component={HelloWorldContainer} />
                <Route path='/verify' component={VerfiyContainer} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/logout' component={LogoutContainer} />
                    <Route path='/edit' component={EditProfileContainer} />
                    <Route path='/faq' component={FAQ}/>
                    <Route path='/helloworld' component={HelloWorldContainer}/>
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                { routes }
            </div>
        );
    }
}

export default Main;