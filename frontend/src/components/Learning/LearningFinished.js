import {
  Grid,
  MenuList,
  TextField,
  Typography,
} from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class LearningFinished extends Component {

  minHeight = 550;

  state = {
    card: {
      title: 'TitleText',
      front: 'FrontText',
      back: 'BackText',
      correct: false,
      deck: 'A',
    },
  };

  componentDidMount() {
    const { cardsAnsweredCorrect, cardsAnsweredIncorrect } = this.props;
    const cardsToList = cardsAnsweredCorrect.concat(cardsAnsweredIncorrect);
    if (cardsToList.length > 0) this.setState({ card: cardsToList[0] });
  }

  renderCardList = () => {
    const { cardsAnsweredCorrect, cardsAnsweredIncorrect } = this.props;
    const cardsToList = cardsAnsweredCorrect.concat(cardsAnsweredIncorrect);
    return (
      <Paper
        style={{
          maxHeight: this.minHeight,
          minHeight: this.minHeight,
          overflow: 'auto',
          width: 200,
          marginLeft: 0,
        }}
      >
        <MenuList>
          {cardsToList.map(card => (
            <MenuItem onClick={() => this.updateCard(card)} style={{ color: card.correct ? 'lightGreen' : 'red' }}>
              {card.title}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    );
  };

  countCardsByDeck = () => {
    const { cardsAnsweredCorrect, cardsAnsweredIncorrect } = this.props;
    const cardsByDeck = [0, 0, 0, 0, 0];

    cardsAnsweredIncorrect.forEach(card => {
      cardsByDeck[card.deck.charCodeAt() - 65] += 1;
    });
    cardsAnsweredCorrect.forEach(card => {
      cardsByDeck[card.deck.charCodeAt() - 65] += 1;
    });
    return cardsByDeck;
  };

  updateCard(card) {
    this.setState({ card });
  }

  render() {
    const { cardsAnsweredCorrect, cardsAnsweredIncorrect } = this.props;
    const cardsByDeck = this.countCardsByDeck();

    return (
      <div
        style={{
          alignItems: 'center',
          alignContent: 'center',
        }}
        justify="center"
        align="center"
      >
        <Typography variant="h3">
          {'You finsihed your learning session!'}
        </Typography>
        <Typography variant="h4">
          {'Check your results here'}
        </Typography>

        <Paper
          style={{
            height: this.minHeight,
            width: '60%',
            marginTop: 50,
          }}
        >
          <Grid
            container
            spacing={8}
            style={{
              height: this.minHeight,
            }}
          >
            <Grid item style={{ padding: 0 }}>
              {this.renderCardList()}
            </Grid>
            <Grid item justify="center">
              <Grid
                container
                direction="column"
                style={{
                  height: this.minHeight,
                }}
                align="left"
                spacing={16}
              >
                <Typography style={{ textAlign: 'center' }} variant="h4">
                  {this.state.card.title}
                </Typography>
                <Typography style={{ textAlign: 'right' }} variant="h6">
                  {this.state.card.deck}
                </Typography>
                <TextField
                  value={this.state.card.front}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Front"
                  multiline
                  rows={4}
                  style={{
                    width: 400,
                    margin: 10,
                  }}
                />
                <TextField
                  value={this.state.card.back}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Back"
                  multiline
                  rows={4}
                  style={{
                    width: 400,
                    margin: 10,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              style={{
                width: 600,
              }}
            >

              <Grid item style={{ height: ((this.minHeight - 50) / 2) }}>

                <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Correct / Incorrect', 'Percentage'],
                    ['Correct', cardsAnsweredCorrect.length],
                    ['Incorrect', cardsAnsweredIncorrect.length],
                  ]}
                  options={{
                    pieSliceText: 'percentage',
                    fontName: 'Roboto',
                    colors: [lightGreen[500], red[500]],
                  }}
                />

              </Grid>
              <Grid item style={{ height: ((this.minHeight - 50) / 2) }}>
                <Chart
                  chartType="Bar"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['', 'Cards'],
                    ['A', cardsByDeck[0]],
                    ['B', cardsByDeck[1]],
                    ['C', cardsByDeck[2]],
                    ['D', cardsByDeck[3]],
                    ['E', cardsByDeck[4]],
                  ]}
                  options={{
                    legend: { position: 'none' },
                    colors: [blue[500]],
                    animation: {
                      duration: 1500,
                      easing: 'in',
                      startup: true,
                    },
                  }}
                />
              </Grid>
            </Grid>

          </Grid>
        </Paper>
      </div>
    );
  }

}

LearningFinished.propTypes = {
  cardsAnsweredCorrect: PropTypes.array.isRequired,
  cardsAnsweredIncorrect: PropTypes.array.isRequired,
};

export default LearningFinished;
