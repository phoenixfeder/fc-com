import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import HomeContainer from '../containers/home-container';
import FAQContainer from '../containers/faq-container';
import RegisterContainer from "../containers/register-container";
import HelloWorldContainer from "../containers/helloworld-container";
import EditProfileContainer from "../containers/editprofile-container";

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route path='/register' component={RegisterContainer}/>
                    <Route path='/faq' component={FAQContainer}/>
                    <Route path='/helloworld' component={HelloWorldContainer}/>
                    <Route path='/edit' component={EditProfileContainer}/>
                </Switch>
            </div>
        );
    }

}

export default Main;