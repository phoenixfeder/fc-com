import { connect } from 'react-redux';
import * as actions from '../../../actions/stat-actions';
import Dashboard from './Dashboard';

const mapStateToProps = state => ({
  username: state.auth.username,
  stats: state.stats.statistics,
});

const mapDispatchToProps = dispatch => ({
  getStatistics: () => dispatch(actions.getStatistics()),
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
