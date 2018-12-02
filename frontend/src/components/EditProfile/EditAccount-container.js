import {connect} from 'react-redux';
import EditAccount from "./EditAccount";

const mapStateToProps = state => {
    return {
        username: state.auth.username
    };
};

const EditAccountContainer = connect(mapStateToProps, null)(EditAccount);

export default EditAccountContainer;