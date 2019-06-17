import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import * as actions from '../../actions/register-actions';
import Register from './Register';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: (object) => dispatch(enqueueSnackbar(object)),
  fetchRegister: (state, callback) => dispatch(actions.fetchRegister(state, callback)),
});


const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default withRouter(RegisterContainer);
