import { connect } from 'react-redux';
import { closeAccount } from '../../actions/auth-actions';
import {
  fetchCloseAccount,
  fetchGetAccountData,
  fetchUpdateAccount,
} from '../../actions/edit-actions';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import EditAccount from './EditAccount';

const mapStateToProps = state => ({
  userID: state.auth.userID,
  sessionHash: state.auth.sessionHash,
  session: state.auth.session,
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: (object) => dispatch(enqueueSnackbar(object)),
  closeAccount: () => dispatch(closeAccount()),
  fetchCloseAccount: (state, callback) => dispatch(fetchCloseAccount(state, callback)),
  fetchGetAccountData: (state, callback) => dispatch(fetchGetAccountData(state, callback)),
  fetchUpdateAccount: (state, callback) => dispatch(fetchUpdateAccount(state, callback)),
});

const EditAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);

export default EditAccountContainer;
