import { Given, When, Then } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import { HomePage, LoginPage } from '../../pageobjects/index.js';
import users from '../../testdata/users.json' with { type: 'json' };

let initialUrl;
const customer = users.customer2;

async function loginAsCustomer() {
  await LoginPage.open();
  await LoginPage.login(customer.email, customer.password);
}

Given('the user is on the home page', async () => {
  await HomePage.open();
  initialUrl = await browser.getUrl();
});

Then('the user should remain on the same page', async () => {
  const currentUrl = await browser.getUrl();
  assert.equal(currentUrl, initialUrl);
});

Given('the user is logged in', async () => {
  await loginAsCustomer();
});

When('the user logs in with valid credentials', async () => {
  await loginAsCustomer();
});
