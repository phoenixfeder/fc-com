import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeAccount } from '../../actions/auth-actions';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import EditAccount from './EditAccount';

const mapStateToProps = state => ({
  userID: state.auth.userID,
  sessionHash: state.auth.sessionHash,
  session: state.auth.session,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ enqueueSnackbar, closeAccount }, dispatch)
);

const EditAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);

export default EditAccountContainer;
