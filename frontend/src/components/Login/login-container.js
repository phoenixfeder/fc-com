import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { enqueueSnackbar } from "../../actions/notistack-snackbar-actions";
import Login from "./Login";

const mapStateToProps = state => {
    return { snackbar: state.snackbars.notifications };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ enqueueSnackbar }, dispatch)


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(LoginContainer);