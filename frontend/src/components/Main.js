import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import HomeContainer from '../containers/home-container';
import FAQ from './FAQ';
import RegisterContainer from "../containers/register-container";
import HelloWorldContainer from "../containers/helloworld-container";
import EditProfile from "./EditProfile";
import Login from './Login'

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route path='/register' component={RegisterContainer}/>
                    <Route path='/faq' component={FAQ}/>
                    <Route path='/helloworld' component={HelloWorldContainer}/>
                    <Route path='/edit' component={EditProfile}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </div>
        );
    }

}

export default Main;