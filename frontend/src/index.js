import IconButton from '@material-ui/core/IconButton/IconButton';
import MuiThemeProviderUI from '@material-ui/core/styles/MuiThemeProvider';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import AppContainer from './components/App/app-container';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { lightTheme } from './utils/themeLight';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={10000}
      action={(
        <IconButton key="close" aria-label="Close" color="inherit">
          <CloseIcon />
        </IconButton>
      )}
    >
      <HashRouter>
        <MuiThemeProviderUI theme={lightTheme}>
          <AppContainer />
        </MuiThemeProviderUI>
      </HashRouter>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
