import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers/index-reducer';
import AppContainer from './components/App/app-container';
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from "notistack";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={4} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={100000}
                          action={<IconButton key="close" aria-label="Close" color="inherit">
                              <CloseIcon/>
                          </IconButton>}  >
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
