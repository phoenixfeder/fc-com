import {
  ListItem,
  ListItemText,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import * as PropTypes from 'prop-types';
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
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class FAQ extends Component {
  componentDidMount() {
    document.title = 'FAQ';
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
              className={classes.paper}
              elevation={2}
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" align="center">Friendly Asked Questions</Typography>
                <Typography variant="body1" align="center">
                  {'Here you will be able to find answers to a lot of possible questions!'}
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Will this application be available for free?"
                      secondary="Yes! We intend to help you learn as good and fast as you can. So restricting your access is no possible option."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Will my grade improve by using the application?"
                      secondary="We try to help you improve your grade. However we can not guarantee any improvements. It all depends on your commitment."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="What exactly is a flashcardbox and how do I create one?"
                      secondary="A flashcardbox is a virtual box that you can store flashcards in. It helps you to group your flashcards by whatever you want.
                        Moreover it defines what you are able to learn together. So make sure to pack all flashcards that you want to learn together in
                        one single flashcardbox. To create one, you have to be logged in. Next you will be able to navigate to your boxes in the menu and create
                        one by clicking the round + button."
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body1" align="center">
                  {'You did not find an answer to your question?'}
                </Typography>
                <Typography variant="body1" align="center">
                  {'Then contact us directly at'}
                </Typography>
                <Typography variant="body1" align="center">
                  <a href="mailto:flashcardcommunity@gmail.com">
                    {'flashcardcommunity@gmail.com'}
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);
