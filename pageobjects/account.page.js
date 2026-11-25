import Page from './page.js';

class AccountPage extends Page {
  constructor() {
    super('/account');
  }

  get pageTitle() {
    return $('[data-test="page-title"]');
  }

  get favoritesBtn() {
    return $('[data-test="nav-favorites"]');
  }

  async openFavorites() {
    await this.favoritesBtn.waitForClickable();
    await this.favoritesBtn.click();
  }

  async expectToBeOpened() {
    await expect(browser).toHaveUrl(expect.stringContaining('/account'));
    await expect(this.pageTitle).toBeDisplayed();
  }
}

export default new AccountPage();
