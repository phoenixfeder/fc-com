import { Grid, Typography, withWidth } from '@material-ui/core/';
import { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

class Graphs extends Component {

  componentWillMount = () => {
    this.props.getStatistics();
  };

  renderCharts = () => (
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
    </>
  );

  render() {
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h4">Statistics</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Total own boxes:</Typography>
          <Typography variant="subtitle1">123</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Shared boxes:</Typography>
          <Typography variant="subtitle1">34</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Own cards:</Typography>
          <Typography variant="subtitle1">987234</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            {'Total answers given:'}
          </Typography>
          <Typography variant="subtitle1">345980</Typography>
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
};

export default withWidth()(Graphs);
