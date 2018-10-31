import React, { Component } from 'react';
import {BACKEND_URL_GETFLASHCARD} from '../utils/const-paths';

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
                <p>Titel: {this.props.flashcard.title}</p>
                <p>Vorderseite: {this.props.flashcard.frontText}</p>
                <p>Rückseite: {this.props.flashcard.backText}</p>
            </div>
        );
    }

}

export default HelloWorld;