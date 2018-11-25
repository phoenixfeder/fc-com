import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {enqueueSnackbar} from "../../actions/notistack-snackbar-actions";
import Register from "./Register";

const mapStateToProps = state => {
    return { snackbar: state.snackbars.notifications };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ enqueueSnackbar }, dispatch)


const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default withRouter(RegisterContainer);