import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { enqueueSnackbar } from "../../actions/notistack-snackbar-actions";
import Verify from "./Verify";

const mapStateToProps = state => {
    return { snackbar: state.snackbars.notifications };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ enqueueSnackbar }, dispatch)


const VerifyContainer = connect(mapStateToProps, mapDispatchToProps)(Verify);

export default withRouter(VerifyContainer);