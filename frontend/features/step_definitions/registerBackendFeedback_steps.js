const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/urls').url;
const select = require('../support/pages/registration_page').select;

Given('I am on the {string} page', async function (page) {
    await testController.navigateTo(url(page));
  }); 

  Given('I enter {string} in the {string}', function (text, field) {
      return pending;
  });

  When('I click on the {string}', function (field) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I get the error {string}', function (error) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I get the message {string}', function (msg) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });