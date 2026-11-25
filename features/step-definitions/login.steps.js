import { Given, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import { LoginPage, HomePage, AccountPage } from '../../pageobjects/index.js';
import users from '../../testdata/users.json' with { type: 'json' };

const user = users.customer2;

Given('the user is on the login page', async () => {
  await LoginPage.open();
});

Then('the user should be redirected to "My Account" page', async () => {
  await AccountPage.expectToBeOpened();
});

Then('the username should be displayed in the profile', async () => {
  const actualName = await HomePage.header.getUserName();
  expect(actualName).to.equal(user.name);
});
