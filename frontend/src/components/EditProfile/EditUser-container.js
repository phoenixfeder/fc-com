import {connect} from 'react-redux';
import EditUser from "./EditUser";

const mapStateToProps = state => {
    return {
        username: state.auth.username
    };
};

const EditUserContainer = connect(mapStateToProps, null)(EditUser);

export default EditUserContainer;