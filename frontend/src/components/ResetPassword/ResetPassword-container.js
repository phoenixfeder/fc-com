import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ResetPassword from './ResetPassword';

const mapStateToProps = state => ({ snackbar: state.snackbars.notifications });

const mapDispatchToProps = dispatch => ({
  a: (a) => console.log(a),
});

const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export default withRouter(ResetPasswordContainer);
