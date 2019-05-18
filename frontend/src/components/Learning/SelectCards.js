import {
  Grid,
  Typography,
  withStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  Checkbox,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Flashcardboxes extends Component {

  state = { decks: [] };

  componentDidMount = () => {
    document.title = 'Select Cards';
  };

  componentWillMount = () => {
    this.props.getFlashcardboxes();
  };

  // Toggles: Adds entry or removes it
  // Could need some optimizing, but does the job for now
  changeDeck = (boxId, letter) => {
    const decks = this.state.decks;
    const newDecks = Array.from(decks);
    const indexToUpdate = newDecks.findIndex(box => box.id === boxId);

    // Check if box exists (then only add deck, else add new object)
    if (indexToUpdate > -1) {

      // Check if deck is already included (then delete, else add)
      if (newDecks[indexToUpdate].decks.includes(`${letter}`)) {
        newDecks[indexToUpdate].decks = newDecks[indexToUpdate].decks.filter(e => e !== `${letter}`);

        // Check if there are any decks left (then delete)
        if (newDecks[indexToUpdate].decks.length === 0) {
          newDecks.splice(indexToUpdate, 1);
        }
      } else {
        newDecks[indexToUpdate].decks = newDecks[indexToUpdate].decks.concat(`${letter}`);
      }
    } else {
      const boxToAdd = { id: boxId, decks: [`${letter}`] };
      newDecks.push(boxToAdd);
    }

    this.setState({ decks: newDecks });
  };

  renderBoxesWithDecks = () => {
    const { boxes, setLearningCards } = this.props;
    return (
      <Card>
        <List>
          {
            boxes.map(box => (
              <CardContent key={box.id}>
                <ListItem>
                  <ListItemText primary={box.title} />
                  <ListItemSecondaryAction>
                    <Chip
                      label={`${box.flashcards} cards`}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  {'A'}
                  <Checkbox onChange={() => this.changeDeck(box.id, 'A')}/>
                  {'B'}
                  <Checkbox onChange={() => this.changeDeck(box.id, 'B')}/>
                  {'C'}
                  <Checkbox onChange={() => this.changeDeck(box.id, 'C')}/>
                  {'D'}
                  <Checkbox onChange={() => this.changeDeck(box.id, 'D')}/>
                  {'E'}
                  <Checkbox onChange={() => this.changeDeck(box.id, 'E')}/>
                </ListItem>
                <Divider />
              </CardContent>
            ))
          }
        </List>
        <CardActions disableActionSpacing>
          <Button
            disabled={this.state.decks.length < 1}
            onClick={() => {
              setLearningCards(this.state.decks);
              // history.push('/select_learning');
            }}
          >
            {'Start learning!'}
          </Button>
        </CardActions>
      </Card>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="Decks">
        <Grid container justify="center">
          <Grid item lg={12} className={classes.headline}>
            <Typography variant="h3" align="center">
              {'Select decks'}
            </Typography>
          </Grid>
          <Grid item lg={8} md={10} xs={12} className={classes.headline}>
            {this.renderBoxesWithDecks()}
          </Grid>
        </Grid>
      </div>
    );
  }

}

Flashcardboxes.propTypes = {
  classes: PropTypes.object.isRequired,
  getFlashcardboxes: PropTypes.func.isRequired,
  boxes: PropTypes.array.isRequired,
  setLearningCards: PropTypes.func.isRequired,
};

export default withStyles(styles)(Flashcardboxes);
