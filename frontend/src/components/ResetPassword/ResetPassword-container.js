import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/auth-actions';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import ResetPassword from './ResetPassword';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: (object) => dispatch(enqueueSnackbar(object)),
  resetPassword: (email, callback) => dispatch(actions.resetPassword(email, callback)),
});

const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export default withRouter(ResetPasswordContainer);
