import {
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core/';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BACKEND_URL_GETFLASHCARD } from '../../utils/const-paths';
import Flashcard from '../Flashcard/Flashcard';

const propTypes = {
  updateFlashcard: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  flashcard: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});


class HelloWorld extends Component {
  state = {
    flashcardCopy: {
      frontText: '',
      backText: '',
    },
  };

  componentWillMount() {
    const { updateFlashcard } = this.props;
    fetch(BACKEND_URL_GETFLASHCARD(100000))
      .then(results => results.json())
      // .then(result => this.props.updateFlashcard(result))
      .then((result) => {
        updateFlashcard(result);
        const { flashcard } = this.props;
        this.setState({ flashcardCopy: flashcard });
      });
  }

  componentDidMount() {
    document.title = 'HelloWorld';
  }

  setTextToBackText = (flashcard) => {
    const { flashcardCopy } = this.state;
    const oldText = flashcard.frontText;
    const flashcardDeepCopy = Object.assign({}, flashcardCopy);
    flashcardDeepCopy.frontText = flashcard.backText;
    flashcardDeepCopy.backText = oldText;
    this.setState({ flashcardCopy: flashcardDeepCopy });
  };

  render() {
    const { classes } = this.props;
    const { flashcardCopy } = this.state;
    return (
      <div className={classes.root} id="helloworld">
        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Grid
              container
              justify="center"
              alignContent="center"
              spacing={16}
              className={classes.paper}
              component={Paper}
              elevation={2}
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" align="center">Hello World</Typography>
                <Typography variant="body1" align="center">Just a small presentation about how a flashcard could look
                  like. This is not mobile responsive yet!</Typography>
              </Grid>
              <Grid item sm={12} md={12} lg={12} style={{ alignSelf: 'center' }}>
                <Flashcard flashcard={flashcardCopy} />
              </Grid>
              <Grid item sm={12} md={12} lg={12} style={{ alignSelf: 'center' }}>
                <Button
                  id="turn-button"
                  variant="contained"
                  color="primary"
                  style={{ align: 'center' }}
                  onClick={() => {
                    this.setTextToBackText(flashcardCopy);
                    this.forceUpdate();
                  }}
                >
                  {'Turn around'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

}

HelloWorld.propTypes = propTypes;

export default withStyles(styles)(HelloWorld);
