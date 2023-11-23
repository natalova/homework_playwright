const { test, expect } = require('@playwright/test')

exports.MainPageNewborn = class MainPageNewborn {
     /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.logoutLink = page.locator('li > a.waves-effect', { hasText: 'Вийти'})
  }

async veryfyLogoutVisible() {
    await expect(this.logoutLink).toBeVisible()
}

}