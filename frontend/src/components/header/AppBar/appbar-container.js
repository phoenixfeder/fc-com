import {connect} from 'react-redux';
import AppBar from './AppBar';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.session !== null,
        username: state.auth.username
    };
};

const AppBarContainer = connect(mapStateToProps, null)(AppBar);

export default AppBarContainer;