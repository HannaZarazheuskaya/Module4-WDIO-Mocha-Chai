import {When, Then} from '@wdio/cucumber-framework';
import { HomePage } from '../../pageobjects/index.js';
import { assert } from 'chai';

When('the user switches the language to {string}', async(language)  =>  {
    await HomePage.header.changeLanguage(language);
});

Then('the labels should be translated:', async (dataTable) => {
    const actualHeaderLabels = await HomePage.header.getMenuLabels();
    const expectedLabels = dataTable.rowsHash();    
    assert.deepEqual(actualHeaderLabels, expectedLabels);
});