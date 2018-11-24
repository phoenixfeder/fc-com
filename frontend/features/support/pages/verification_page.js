const {Selector} = require('testcafe');


exports.select = (select) => {
    switch(select){
        case 'root':
            return Selector('#root');
        case 'snackbar':
            return Selector('#client-snackbar');
        case 'title':
            return Selector("title");
        case 'mail-field':
            return Selector('#user-mail-input');
        case 'resend-button':
            return Selector('#resend-button');
    }
}