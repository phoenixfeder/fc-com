import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as FlashcardStyle from '../../utils/const-flashcard';
import './flashcard.css';

class Flashcard extends Component {
  state = {};

  renderCardBody() {
    return (
      <List>
        {this.props.flashcard.text.split('!')
          .map(part => (
              <div>
                <Divider />
                <ListItem>
                  <ListItemText primary={part} />
                </ListItem>
              </div>
            )
          )}
      </List>
    );
  }

  render() {
    const { flashcard } = this.props;
    return (
      <Paper style={{
        backgroundColor: FlashcardStyle.FLASHCARD_NEUTRAL,
        width: '50%',
      }}>
        {flashcard.title}
        <Divider />
        <Divider style={{
          height: 2,
          visibility: 'hidden',
        }}
        />
        {this.renderCardBody()}
      </Paper>

      /*
      <div className="flashcard" style={{ backgroundColor: FlashcardStyle.FLASHCARD_NEUTRAL }}>
      <div className="flashcard-title">
      {flashcard.title}
      </div>
      <div className="flashcard-text">
      {flashcard.text}
      </div>
      </div>
      */
    );
  }
}

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    title: PropTypes.string,
    frontText: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default Flashcard;
