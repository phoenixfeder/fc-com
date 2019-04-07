import { withSnackbar } from 'notistack';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeSnackbar } from '../actions/notistack-snackbar-actions';

class Notifier extends Component {
  state = {
    displayed: [],
  };

  storeDisplayed = key => {
    this.setState(({ displayed }) => ({
      displayed: [...displayed, key],
    }));
  };

  render() {
    const { notifications, enqueueSnackbar, removeSnackbar } = this.props;
    const { displayed } = this.state;

    notifications.forEach(notification => {
      setTimeout(() => {
        // If notification already displayed, abort
        if (displayed.indexOf(notification.key) > -1) return;
        // Display notification using notistack
        enqueueSnackbar(notification.message, notification.options);
        // Add notification's key to the local state
        this.storeDisplayed(notification.key);
        // Dispatch action to remove the notification from the redux store
        removeSnackbar(notification.key);
      }, 1);
    });

    return null;
  }

}

const mapStateToProps = store => ({
  notifications: store.snackbars.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSnackbar(Notifier));

Notifier.propTypes = {
  notifications: PropTypes.array.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  removeSnackbar: PropTypes.func.isRequired,
};
