const { Given, When, Then } = require('cucumber');
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
/*
  let iterations = 0;
  let titleField = undefined;

  while (!titleField && iterations < 10) {
    await testController.wait(1000);
    titleField = select('title').with({ boundTestRun: testController });
    iterations += 1;
  }
*/
  await testController.expect(select('title').with({ boundTestRun: testController }).innerText).eql(page);
});

Then('rI get the message {string}', async function (msg) {

  let fieldExists = false;
  let iterations = 0;
  while (!fieldExists && iterations < 10) {
    await testController.wait(1000);
    const feedbackField = select('snackbar').with({ boundTestRun: testController }).withText(msg);
    fieldExists = await feedbackField.exists;
    iterations += 1;
  }
  await testController.expect(fieldExists).ok();
});

Then('rI get a login error', async function () {

  let fieldExists = false;
  let iterations = 0;
  while (!fieldExists && iterations < 10) {
    await testController.wait(1000);
    const feedbackField = select('snackbar').with({ boundTestRun: testController }).withText('Username or password wrong');
    fieldExists = await feedbackField.exists;
    iterations += 1;
  }
  await testController.expect(fieldExists).ok();

});

Then('rWait for one second', async function () {
  await testController.wait(1000);
});
