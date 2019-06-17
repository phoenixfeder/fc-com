import {
  Grid,
  Typography,
  withWidth,
} from '@material-ui/core/';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import {
  isWidthDown,
  isWidthUp,
} from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class Graphs extends Component {

  componentWillMount = () => {
    this.props.getStatistics();
  };

  renderCharts = () => {
    // For some reasons props.cardsInDecks is an object?!
    /*
      "0": 0,
      "1": 2,
      "3": 4,
      etc.
    */
    const cardsInDecks = [0, 0, 0, 0, 0];

    Object.entries(this.props.stats.cardsInDecks)
      .forEach((entry, iteration) => {
        cardsInDecks[iteration] = entry[1];
      });

    return (
      <>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            {'Cards in Category'}
          </Typography>
          <Chart
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ['', 'Cards'],
              ['A', cardsInDecks[0]],
              ['B', cardsInDecks[1]],
              ['C', cardsInDecks[2]],
              ['D', cardsInDecks[3]],
              ['E', cardsInDecks[4]],
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
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="subtitle2">
            {'Correctly answered'}
          </Typography>
          <Chart
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Correct / Incorrect', 'Percentage'],
              ['Correct', this.props.stats.successfulTrials],
              ['Incorrect', this.props.stats.failedTrials],
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
              ['Own', this.props.stats.ownBoxes],
              ['Shared', this.props.stats.accessToForeignBoxes],
            ]}
            options={{
              pieSliceText: 'value',
              fontName: 'Roboto',
              colors: [blue[500], green[500]],
            }}
          />
        </Grid>
      </>
    );
  };

  render() {
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h4">Statistics</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Own boxes:</Typography>
          <Typography variant="subtitle1">
            {this.props.stats.ownBoxes}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Shared boxes:</Typography>
          <Typography variant="subtitle1">
            {this.props.stats.boxesSharedToUsers}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Own cards:</Typography>
          <Typography variant="subtitle1">
            {this.props.stats.ownCards}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            {'Total answers given:'}
          </Typography>
          <Typography variant="subtitle1">
            {this.props.stats.totalTrials}
          </Typography>
        </Grid>
        {/* Google Charts are not responsive! Need to retreigger render when size changes */}
        {isWidthDown('xs', this.props.width) && this.renderCharts()}
        {isWidthUp('sm', this.props.width) && this.renderCharts()}
      </>
    );
  }

}

Graphs.propTypes = {
  getStatistics: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
};

export default withWidth()(Graphs);
