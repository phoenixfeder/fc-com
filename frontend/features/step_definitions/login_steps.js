const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/urls').url;
const select = require('../support/pages/login_page').select;

Given('rI am on the {string} page', async function (page) {
    await testController.navigateTo(url(page));
});

When('rI enter {string} in the {string}', async function (text, field) {
    const inputField = select(field);
    await testController.click(inputField)
        .selectText(inputField).pressKey('delete') //slow solution
        .typeText(inputField, text);
});

When('rI click on the {string}', async function (field) {
    const inputField = select(field);
    await testController.click(inputField);
});

Then('rI get redirected to the {string} page', async function (page) {
    await testController.wait(1000).expect(select('title').with({boundTestRun: testController}).innerText).eql(page);
});

Then('rI get the message {string}', async function (msg) {
    const feedbackField = select('snackbar').with({boundTestRun: testController}).withText(msg);
    await  testController.expect(await feedbackField.exists).ok();
});

Then('rI get a login error', async function () {
    const feedbackField = select('snackbar').with({boundTestRun: testController}).withText("Username or password wrong");
    await  testController.expect(await feedbackField.exists).ok();
});

