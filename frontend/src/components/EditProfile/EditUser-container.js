import { connect } from 'react-redux';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import { fetchGetAccountData, fetchUpdateUser } from '../../actions/edit-actions';
import EditUser from './EditUser';

const mapStateToProps = state => ({
  userID: state.auth.userID,
  sessionHash: state.auth.sessionHash,
  session: state.auth.session,
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: (object) => dispatch(enqueueSnackbar(object)),
  fetchGetAccountData: (state, callback) => dispatch(fetchGetAccountData(state, callback)),
  fetchUpdateUser: (state, callback) => dispatch(fetchUpdateUser(state, callback)),
});

const EditUserContainer = connect(mapStateToProps, mapDispatchToProps)(EditUser);

export default EditUserContainer;
