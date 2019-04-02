import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditProfile from './EditProfile';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';

const mapStateToProps = state => ({
  userID: state.auth.userID,
  sessionHash: state.auth.sessionHash,
  session: state.auth.session,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ enqueueSnackbar }, dispatch)
);

const EditProfileContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfile);

export default EditProfileContainer;
