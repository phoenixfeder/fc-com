import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';

const MainContainer = connect()(Main);

export default withRouter(MainContainer);