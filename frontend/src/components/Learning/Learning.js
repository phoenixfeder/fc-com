import {
  Grid,
  Typography,
  withStyles,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
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

class Learning extends Component {

  componentDidMount = () => {
    document.title = 'Select Cards';
  };

  renderDemo = () => {
    const { cards } = this.props;
    return (
      <Card>
        <List>
          {
            cards.map(card => (
              <CardContent key={card.id}>
                <ListItem>
                  <ListItemText primary={card.front} secondary={card.back} />
                  <ListItemSecondaryAction>
                    {card.deck}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </CardContent>
            ))
          }
        </List>
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
              {'Learning'}
            </Typography>
          </Grid>
          <Grid item lg={8} md={10} xs={12} className={classes.headline}>
            {this.renderDemo()}
          </Grid>
        </Grid>
      </div>
    );
  }

}

Learning.propTypes = {
  classes: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
};

export default withStyles(styles)(Learning);
