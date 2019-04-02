import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/auth-actions';
import Logout from './Logout';

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout()),
});

const LogoutContainer = connect(null, mapDispatchToProps)(Logout);

export default withRouter(LogoutContainer);
