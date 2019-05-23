import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';


const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  text: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

class Home extends Component {
  componentDidMount() {
    document.title = 'Home';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Grid
              container
              justify="center"
              spacing={16}
              elevation={2}
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" align="center" className={classes.text}>Welcome at Flashcard Community!</Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body1" className={classes.text}>
                  {`Hi there! You probably found this site while searching for a site to learn flashcards let us tell you:
                  You have come to the right place! 😉`}
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body1" className={classes.text}>
                  {`So who are we and do we have to offer? We, Flashcard Community, had the idea to develop a modern platform to learn flashcards.
                  Out platform offers you do the following:
                  `}
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" className={classes.text}>
                      {'Create flashcardboxes with flashcards in it 📦'}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.text}>
                      {'Share flashcardboxes with you friends 🙌'}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.text}>
                      {'Learn flashcards with different methods 📑'}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.text}>
                      {'Statistics about your learning progess 📈'}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.text}>
                      {'Ad- and distraction free user interface 🤫'}
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body1" className={classes.text}>
                  {'We got your interest? Great! Head over to the '}
                  <Link id="link-register" to="/register">register page</Link>
                  {'! Don\'t worry, if you aren\' statisfied with our platform you can delete your account at any time!'}
                </Typography>
              </Grid>
              <Grid item lg={12} align="center">
                <Typography variant="h5" className={classes.text}>
                  {'Happy Learning! 👍'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter,
)(Home);
