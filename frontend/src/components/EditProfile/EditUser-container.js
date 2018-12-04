import {connect} from 'react-redux';
import EditUser from "./EditUser";

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        sessionHash: state.auth.sessionHash,
        session: state.auth.session,
    };
};

const EditUserContainer = connect(mapStateToProps, null)(EditUser);

export default EditUserContainer;