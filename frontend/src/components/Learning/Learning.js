import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles,
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

  state = {
    cards: 6,
    correctCards: 1,
  };

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
            <div style={{
              verticalAlign: 'top',
              display: 'flex',
              flexDirection: 'row',
              width: '90%',
              marginLeft: '5%',
              marginRight: '5%',
            }}>

              <div style={{
                width: '65%',
                verticalAlign: 'top',
                display: 'flex',
                flexDirection: 'row',
                marginRight: '5%',
                marginLeft: '15%',
              }}>
                 {this.renderDemo()}
              </div>
              <div
                className={'Paper'}
                style={{
                width: '13%',
                verticalAlign: 'top',
                display: 'flex',
                flexDirection: 'row',
                  marginLeft: '2%',
              }}>
                {'Correct: '+ (100*this.state.correctCards/this.state.cards) + '% (' + this.state.correctCards + '/' + this.state.cards + ')'}
              </div>
            </div>
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
