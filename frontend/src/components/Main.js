import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import HomeContainer from '../containers/home-container';
import FAQContainer from '../containers/faq-container';

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route path='/faq' component={FAQContainer}/>
                </Switch>
            </div>
        );
    }

}

export default Main;