import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as FlashcardStyle from '../../utils/const-flashcard';
import './flashcard.css';

const propTypes = {
  flashcard: PropTypes.shape({
    title: PropTypes.string,
    frontText: PropTypes.string,
  }).isRequired,
};

class Flashcard extends Component {
  state = {};

  render() {
    const { flashcard } = this.props;
    return (
      <div className="flashcard" style={{ backgroundColor: FlashcardStyle.FLASHCARD_NEUTRAL }}>
        <div className="flashcard-title">
          {flashcard.title}
        </div>
        <div className="flashcard-text">
          {flashcard.frontText}
        </div>
      </div>
    );
  }
}

Flashcard.propTypes = propTypes;

export default Flashcard;
