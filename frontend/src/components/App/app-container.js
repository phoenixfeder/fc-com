import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './App';

const AppContainer = connect()(App);

export default withRouter(AppContainer);
