import { connect } from 'react-redux';
import Startpage from './Startpage';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.session !== null,
});

const StartpageContainer = connect(mapStateToProps, null)(Startpage);

export default StartpageContainer;
