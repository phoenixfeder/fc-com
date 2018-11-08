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
                <div >
                    <Flashcard flashcard={this.props.flashcard}/>
                </div>
                <button onClick={() => {setTextToBackText(this.props.flashcard); this.forceUpdate()}}>Turn around</button>
            </div>

        );
    }

}
function setTextToBackText(flashcard) {
    var oldText = flashcard.frontText
    flashcard.frontText = flashcard.backText
    flashcard.backText = oldText
}
export default HelloWorld;