const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/urls').url;
const select = require('../support/pages/registration_page').select;

Given('I am on the {string} page', async function (page) {
    await testController.navigateTo(url(page));
  }); 

  Given('I enter {string} in the {string}', async function (text, field) {
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
  await  testController.expect(await outputField.innerText).contains(error); 
  });

  Then('I get the message {string}', function (msg) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });





