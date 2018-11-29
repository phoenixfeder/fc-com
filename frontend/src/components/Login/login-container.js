import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { enqueueSnackbar } from "../../actions/notistack-snackbar-actions";
import Login from "./Login";
import * as actions from '../../actions/auth-actions';

const mapStateToProps = state => {
    return { snackbar: state.snackbars.notifications, loading: state.auth.loading, error: state.auth.error};
};

const mapDispatchToProps = dispatch => {
    return {
        enqueueSnackbar: bindActionCreators(enqueueSnackbar , dispatch),
        onAuth: (username, password) => dispatch(actions.auth(username, password)),
    };
}
    


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(LoginContainer);