const {Selector} = require('testcafe');


exports.select = (select) => {
    switch(select){
        case 'root':
            return Selector('#root');
        case 'snackbar':
            return Selector('#client-snackbar');
        case 'title':
            return Selector("title");
        case 'username-field':
            return Selector('#username-input');
        case 'password-field':
            return Selector('#password-input')
        case 'login-button':
            return Selector('#login-button')
    }
}