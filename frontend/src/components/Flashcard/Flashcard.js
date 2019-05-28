import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as FlashcardStyle from '../../utils/const-flashcard';
import './flashcard.css';

class Flashcard extends Component {
  state = {};

  render() {
    const { flashcard } = this.props;
    const title = flashcard ? flashcard.title : '';
    return (
      <Paper
        style={{
          backgroundColor: FlashcardStyle.FLASHCARD_NEUTRAL,
          width: '50%',
        }}
        draggable
      >
        <Typography style={{ fontSize: 25 }}>
          {title}
        </Typography>
        <Divider />
        <Divider style={{
          height: 5,
          visibility: 'hidden',
        }}
        />
        <Divider />
        {this.renderCardBody()}
      </Paper>
    );
  }

  renderCardBody() {
    const { flashcard, showFront } = this.props;
    const text = flashcard ? (showFront ? flashcard.front : flashcard.back) : '';

    const words = text.split(' ');
    const lines = [];
    let line = '';
    words.forEach(word => {
      if (line.length < window.innerWidth / 40) {
        line += `${word} `;
      } else {
        lines.push(line);
        line = `${word} `;
      }
    });
    lines.push(line.trimEnd());

    do {
      lines.push('');
    } while (lines.length < 4);

    return (
      <List
        style={{ padding: 0 }}
      >
        {
          lines
            .map(part => (
              <div>
                <ListItem
                  style={{
                    minHeight: 25,
                    maxHeight: 25,
                    textAlign: 'center',
                  }}
                  divider
                >
                  <ListItemText primary={part} />
                </ListItem>
              </div>),
            )}
      </List>
    );
  }
}

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    title: PropTypes.string,
    front: PropTypes.string,
    back: PropTypes.string,
  }).isRequired,
  showFront: PropTypes.bool.isRequired,
};

export default Flashcard;
