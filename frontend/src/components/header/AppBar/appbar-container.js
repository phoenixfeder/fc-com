import { connect } from 'react-redux';
import AppBar from './AppBar';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.session !== null,
  username: state.auth.username,
  userId: state.auth.userId,
  isLoading: state.auth.loading || state.learning.loading || state.flashcardboxes.loading
    || state.flashcardboxes.createLoading || state.flashcardboxes.deleteLoading || state.flashcardboxes.editLoading
    || state.flashcardboxes.shareLoading || state.flashcardsOverview.loading || state.flashcardsOverview.createLoading
    || state.flashcardsOverview.deleteLoading || state.flashcardsOverview.editLoading,
});

const AppBarContainer = connect(mapStateToProps, null)(AppBar);

export default AppBarContainer;
