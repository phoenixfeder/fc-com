import {connect} from 'react-redux';
import EditAccount from "./EditAccount";

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        sessionHash: state.auth.sessionHash,
        session: state.auth.session,
    };
};

const EditAccountContainer = connect(mapStateToProps, null)(EditAccount);

export default EditAccountContainer;