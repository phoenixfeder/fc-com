import {connect} from 'react-redux';
import App from '../components/App';
import {withRouter} from 'react-router-dom';

const AppContainer = connect()(App);

export default withRouter(AppContainer);
