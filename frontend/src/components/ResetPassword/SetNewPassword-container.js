import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import SetNewPassword from './SetNewPassword';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => bindActionCreators({ enqueueSnackbar }, dispatch);

const SetNewPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(SetNewPassword);

export default withRouter(SetNewPasswordContainer);
