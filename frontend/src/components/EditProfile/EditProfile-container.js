import {connect} from 'react-redux';
import EditProfile from "./EditProfile";

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        sessionHash: state.auth.sessionHash,
        session: state.auth.session,
    };
};

const EditProfileContainer = connect(mapStateToProps, null)(EditProfile);

export default EditProfileContainer;