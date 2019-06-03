import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core/';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
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

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'Home';
  }

  componentWillMount = () => {
    this.props.getStatistics();
  };

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
              direction="row"
            >
              <Grid item xs={12}>
                <Typography variant="h3" align="center">
                  {`Welcome ${this.props.username}!`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  {'Glad to see you again! As you are now logged in, you have now access to your flashcardboxes and are able to learn!'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {'Statistics'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {'Total own boxes:'}
                </Typography>
                <Typography variant="subtitle1">
                  {'123'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {'Shared boxes:'}
                </Typography>
                <Typography variant="subtitle1">
                  {'34'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {'Own cards:'}
                </Typography>
                <Typography variant="subtitle1">
                  {'987234'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {'Total answers given:'}
                </Typography>
                <Typography variant="subtitle1">
                  {'345980'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {'Cards in Category'}
                </Typography>
                <Chart
                  chartType="Bar"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['', 'Cards'],
                    ['A', 1000],
                    ['B', 1170],
                    ['C', 660],
                    ['D', 1030],
                    ['E', 1030],
                  ]}
                  options={{
                    legend: { position: 'none' },
                    colors: [blue[500]],
                    animation: {
                      duration: 1000,
                      easing: 'linear',
                      startup: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="subtitle2">
                  {'Correctly answered'}
                </Typography>
                <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Correct / Incorrect', 'Percentage'],
                    ['Correct', 67],
                    ['Incorrect', 23],
                  ]}
                  options={{
                    pieSliceText: 'percentage',
                    fontName: 'Roboto',
                    colors: [blue[500], red[500]],
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="subtitle2">
                  {'Flashcardboxes distrubution'}
                </Typography>
                <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Own / Shared', 'Percentage'],
                    ['Own', 67],
                    ['Shared', 23],
                  ]}
                  options={{
                    pieSliceText: 'value',
                    fontName: 'Roboto',
                    colors: [blue[500], green[500]],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  getStatistics: PropTypes.func.isRequired,
};

export default withStyles(styles)(Dashboard);
