import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditAccount from './EditAccount';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import { closeAccount } from '../../actions/auth-actions';

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
