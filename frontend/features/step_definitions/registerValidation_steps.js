const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/urls').url;
const select = require('../support/pages/registration_page').select;

  Then('I get no error', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('the {string} is not clickable', async function(button){
    const buttonToClick = select(button).with({boundTestRun: testController});;
   await testController.expect(buttonToClick.hasAttribute('disabled')).ok();
   
});

Then('the {string} is clickable', async function(button){
    const buttonToClick = select(button).with({boundTestRun: testController});;
    await testController.expect(buttonToClick.hasAttribute('disabled')).notOk();
    });