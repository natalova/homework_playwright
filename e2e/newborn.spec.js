// ENV_URL=http://5.189.186.217 npx playwright test newborn.spec.js --headed --project chromium


const { test, expect } = require('@playwright/test');
const { MainPageNewborn } = require('./pages/mainPageNewborn')

test.describe('Verification steps for newborn website', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
      })
   
    
    test('open the page', async ({ page }) => {
       // await page.goto('/')      
        await expect(page.locator('span.card-title').nth(0)).toBeVisible()
    })

    test('usage POM', async ({ page }) => {
        const mainpagenewborn = new MainPageNewborn(page)
        mainpagenewborn.verifyLogoutVisible()
    })


    })