import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions/auth-actions';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.session !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withRouter(MainContainer);