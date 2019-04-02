import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from './Main';
import * as actions from '../../actions/auth-actions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.session !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withRouter(MainContainer);
