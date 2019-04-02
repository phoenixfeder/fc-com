import IconButton from '@material-ui/core/IconButton/IconButton';
import MuiThemeProviderUI from '@material-ui/core/styles/MuiThemeProvider';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import AppContainer from './components/App/app-container';
import './index.css';
import allReducers from './reducers/index-reducer';
import * as serviceWorker from './serviceWorker';
import { lightTheme } from './utils/themeLight';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const store = createStore(allReducers, composeEnhancers(
  applyMiddleware(thunk),
));

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={10000}
      action={(
        <IconButton key="close" aria-label="Close" color="inherit">
          <CloseIcon />
        </IconButton>
      )}
    >
      <BrowserRouter>
        <MuiThemeProviderUI theme={lightTheme}>
          <AppContainer />
        </MuiThemeProviderUI>
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
