import { Given, When, Then } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import { ProductDetailPage, HomePage, CheckoutPage } from '../../pageobjects/index.js';
import users from '../../testdata/users.json' with { type: 'json' };

Given('the user adds {int} items of the first product to cart', async (quantity) => {
  await HomePage.openFirstProduct();
  await ProductDetailPage.increaseProdQuantity(quantity);
  await ProductDetailPage.addToCart();
});

Given('the user opens the cart', async () => {
  await ProductDetailPage.header.openCart();
});

When('the user removes the product from cart', async () => {
  await CheckoutPage.removeFirstProdFromCart();
  await CheckoutPage.cartEmptyMsg.waitForDisplayed({
    timeout: 5000,
    timeoutMsg: 'Message saying the cart is empty was not displayed.',
  });
});

Then('the cart should contain no products', async () => {
  const productsInCart = await CheckoutPage.cartTableRows;
  assert.equal(productsInCart.length, 0, 'Cart table is still present, it is not empty.');
});

Then('the message {string} should be displayed', async (expectedMessage) => {
  await CheckoutPage.cartEmptyMsg.waitForDisplayed({
    timeout: 5000,
    timeoutMsg: 'Message saying the cart is empty was not displayed.',
  });

  const actualMsg = await CheckoutPage.cartEmptyMsg.getText();
  assert.equal(actualMsg, expectedMessage, 'Text of the empty cart message is incorrect.');
});

Given('the user proceeds to checkout with valid billing address', async () => {
  const user = users.customer2;
  await CheckoutPage.clickProceed();
  await CheckoutPage.confirmLogInStep();
  await CheckoutPage.setBillingAddress(user.address);
  await CheckoutPage.confirmAddressStep();
});

When('the user selects {string} payment option', async (paymentOption) => {
  await CheckoutPage.paymentMethod.waitForDisplayed({
    timeoutMsg: 'Payment Method page did not load.',
  });
  await CheckoutPage.paymentMethod.selectByVisibleText(paymentOption);
});

When('the user confirms payment', async () => {
  await CheckoutPage.confirmBtn.waitForClickable();
  await CheckoutPage.confirmBtn.click();

  await browser.waitUntil(
    async () => {
      const btnText = await CheckoutPage.confirmBtn.getText();
      return btnText.trim() === 'Confirm';
    },
    {
      timeout: 5000,
      timeoutMsg: 'Confirmation button text did not change',
    },
  );

  await CheckoutPage.confirmBtn.click();
});

Then('the order confirmation with the invoice number should be displayed', async () => {
  await CheckoutPage.orderConfirmationMsg.waitForDisplayed({
    timeout: 5000,
    timeoutMsg: 'Order confirmation message did not load.',
  });

  const actualConfirmationMsg = await CheckoutPage.orderConfirmationMsg.getText();
  assert.include(
    actualConfirmationMsg,
    'Thanks for your order! Your invoice number is',
    'Confirmation has no invoice info.',
  );
});

Then('the cart should contain {int} items of this product', async (expectedQuantity) => {
  const productQuantity = await CheckoutPage.getFirstProdQuantity();
  assert.equal(
    productQuantity,
    expectedQuantity,
    'Product quantity in the cart does not match the added number of items.',
  );
});
