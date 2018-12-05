import {connect} from 'react-redux';
import EditProfile from "./EditProfile";
import {bindActionCreators} from "redux";
import {enqueueSnackbar} from "../../actions/notistack-snackbar-actions";

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        sessionHash: state.auth.sessionHash,
        session: state.auth.session,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ enqueueSnackbar }, dispatch)

const EditProfileContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfile);

export default EditProfileContainer;