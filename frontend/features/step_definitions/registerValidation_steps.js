const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/urls').url;
const select = require('../support/pages/registration_page').select;


Given('I am on the {string} page', async function (page) {
    await testController.navigateTo(url(page));
});

When('I enter {string} in the {string}', async function (text, field) {
    const inputField = select(field);
    await testController.click(inputField)
        .selectText(inputField).pressKey('delete') //slow solution
        .typeText(inputField, text);
});

When('I click on the {string}', async function (field) {
    const inputField = select(field);
    await testController.click(inputField);
});

Then('I get the error {string} in the {string}', async function (error, field) {
    const outputField = select(field).with({boundTestRun: testController});
    console.log(outputField);
    await  testController.expect(await outputField.innerText).contains(error);
});

Then('I get the message {string}', async function (msg) {
    const feedbackField = select('snackbar').with({boundTestRun: testController});
    await  testController.expect(await feedbackField.innerText).contains(msg);
});


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

Then('I get redirected to the {string} page', async function (page) {
       await testController.wait(1000).expect(select('title').with({boundTestRun: testController}).innerText).eql(page);
    });

Then('Wait for one second', async function () {
    await  testController.wait(1000);
});