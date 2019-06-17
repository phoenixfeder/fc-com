import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/auth-actions';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import SetNewPassword from './SetNewPassword';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: (object) => dispatch(enqueueSnackbar(object)),
  submitNewPassword: (state, callback) => dispatch(actions.submitNewPassword(state, callback)),
});

const SetNewPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(SetNewPassword);

export default withRouter(SetNewPasswordContainer);
