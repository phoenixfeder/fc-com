const {Selector} = require('testcafe');


exports.select = (select) => {
    switch(select){
        case 'root':
            return Selector('#root');
        case 'username-field':
            return Selector('#user-input');
        case 'password-field':
            return Selector('#user-password');
        case 'password-repeat-field':
            return Selector('#user-password-repeat');
        case 'email-field':
            return Selector('#user-mail-input');
        case 'register-button':
            return Selector('#register-button');
        case 'username-error-field':
            return Selector('#usernameErrorMsgID');
        case 'register-feedback-field':
            return Selector('#register-feedback');
    }
}