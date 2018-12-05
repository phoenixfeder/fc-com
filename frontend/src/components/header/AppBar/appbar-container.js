import {connect} from 'react-redux';
import AppBar from './AppBar';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.session !== null,
        username: state.auth.username,
        userId: state.auth.userId
    };
};

const AppBarContainer = connect(mapStateToProps, null)(AppBar);

export default AppBarContainer;