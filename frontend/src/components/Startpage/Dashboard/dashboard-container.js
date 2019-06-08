import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import * as actions from '../../../actions/stat-actions';

const mapStateToProps = state => ({
  username: state.auth.username,
  stats: state.stats.statistics,
});

const mapDispatchToProps = dispatch => ({
  getStatistics: () => dispatch(actions.getStatistics()),
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
