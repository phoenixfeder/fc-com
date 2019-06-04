import { connect } from 'react-redux';
import * as actions from '../../../actions/stat-actions';
import Graphs from './Graphs';

const mapStateToProps = state => ({
  stats: state.stats.statistics,
});

const mapDispatchToProps = dispatch => ({
  getStatistics: () => dispatch(actions.getStatistics()),
});

const GrpahsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Graphs);

export default GrpahsContainer;
