import React, { Component } from 'react';
import {BACKEND_URL_GETFLASHCARD} from '../utils/const-paths';
import Flashcard from './Flashcard';

class HelloWorld extends Component {

    componentWillMount() {
        fetch(BACKEND_URL_GETFLASHCARD(100000))
        .then(results => {
            return results.json();
        })
        //.then(result => this.props.updateFlashcard(result))
        .then(result => this.props.updateFlashcard(result))

    }

    render() {
        return (
            <div id="helloworld">
                <p>Ich bin die HelloWorld-Seite</p>
                <Flashcard flashcard={this.props.flashcard}/>
            </div>
        );
    }

}

export default HelloWorld;