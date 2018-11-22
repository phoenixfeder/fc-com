import React, {Component} from 'react';
import './flashcard.css'
import * as FlashcardStyle from '../../utils/const-flashcard';


class Flashcard extends Component {

    render() {
        return (
            <div className="flashcard" style={{backgroundColor: FlashcardStyle.FLASHCARD_RED}}>
                <div className="flashcard-title">
                    {this.props.flashcard.title}
                </div>
                <div className="flashcard-text">
                    {this.props.flashcard.frontText}
                </div>
            </div>
        );

    }

    

}




export default Flashcard;