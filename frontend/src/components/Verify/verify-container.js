import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { enqueueSnackbar } from '../../actions/notistack-snackbar-actions';
import * as actions from '../../actions/register-actions';
import Verify from './Verify';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: (object) => dispatch(enqueueSnackbar(object)),
  fetchVerify: (params, callback) => dispatch(actions.fetchVerify(params, callback)),
  fetchNewVerifyToken: (state, callback) => dispatch(actions.fetchNewVerifyToken(state, callback)),
});


const VerifyContainer = connect(mapStateToProps, mapDispatchToProps)(Verify);

export default withRouter(VerifyContainer);
