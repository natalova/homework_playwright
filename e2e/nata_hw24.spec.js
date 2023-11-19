// npx playwright test nata_hw24.spec.js --headed --project chromium
// npx playwright test nata_hw24.spec.js --project chromium

const { test, expect } = require('@playwright/test');

test.describe('Open Guru website', () => {
    

    test.beforeEach(async ({ page }) => {
        await page.goto('https://guru99.com/')
      })

    test('Check input', async ({ page }) => {
        const input = page.locator('input.gsc-input')
        const headerBlock = page.locator('.g-content.g-particle')
       
        await headerBlock.hover()
        await input.click()
        await input.fill('sap')
        await input.clear()
        await input.pressSequentially('SAP')
        await input.pressSequentially('Tutorial', {delay: 200})
    })

})