import {Given, When, Then} from '@wdio/cucumber-framework';
import { HomePage, ProductDetailPage, FavoritesPage } from "../../pageobjects/index.js";
import { should } from "chai";
should();

Given('the user is on the product detail page of the first product', async () => {
    await HomePage.open();
    await HomePage.openFirstProduct();
});

let expectedProductName;

When('the user adds the product to Favorites', async() => {
    await ProductDetailPage.productName.waitForDisplayed();
    expectedProductName = (await ProductDetailPage.productName.getText()).trim();
    await ProductDetailPage.addToFavorites();
});


When('the user opens the Favorites page', async() => {
    await ProductDetailPage.header.openFavorites();
});

Then('the added product should be displayed on the Favorites page', async()=> {
    const actualFavoriteProducts = await FavoritesPage.getProductTitlesList();
    actualFavoriteProducts.should.include(expectedProductName);
});