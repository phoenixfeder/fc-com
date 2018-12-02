import {connect} from 'react-redux';
import EditProfile from "./EditProfile";

const mapStateToProps = state => {
    return {
        username: state.auth.username
    };
};

const EditProfileContainer = connect(mapStateToProps, null)(EditProfile);

export default EditProfileContainer;