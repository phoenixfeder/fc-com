import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import ResetPassword from './ResetPassword';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => bindActionCreators({ enqueueSnackbar }, dispatch);

const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export default withRouter(ResetPasswordContainer);
