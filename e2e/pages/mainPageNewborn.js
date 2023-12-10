const { test, expect } = require('@playwright/test')

exports.MainPageNewborn = class MainPageNewborn {
     /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.logoutLink = page.locator('li > a.waves-effect').nth(5)
  }

async veryfyLogoutVisible() {
    await expect(this.logoutLink).toHaveText('Вийти')
  }
}