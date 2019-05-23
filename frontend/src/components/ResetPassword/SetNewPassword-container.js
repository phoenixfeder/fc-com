import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import SetNewPassword from './SetNewPassword';
import * as actions from '../../actions/auth-actions';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: (object) => dispatch(enqueueSnackbar(object)),
  submitNewPassword: (state, callback) => dispatch(actions.submitNewPassword(state, callback)),
});

const SetNewPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(SetNewPassword);

export default withRouter(SetNewPasswordContainer);
