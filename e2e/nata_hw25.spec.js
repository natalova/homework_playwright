// npx playwright test nata_hw25.spec.js --headed --project chromium
// npx playwright test nata_hw25.spec.js --project chromium
// npx playwright codegen google.com --geolocation="-0.20256,51.90224"  

import { test, expect } from '@playwright/test';


test.describe("User's location", () => {
   
    test.use({
        geolocation: { 
            longitude: -0.20256, 
            latitude: 51.90224
        }, 
        permissions: ['geolocation'],
        locale: 'en-GB', 
})

test("Search in Google by GB", async ({ page }) => {
    const searchField = page.locator('.gLFyf')
    const mapBtn = page.getByRole('link', { name: 'Maps' })

    await page.goto('https://www.google.com/')
    await searchField.click()
    await page.keyboard.type('магазин одягу', {delay: 200})
    await searchField.press('Enter')
    await page.waitForSelector('#search')
    await page.screenshot({path: 'screenshots/success_search_GB.png', fullPage: false})
    await expect(mapBtn).toBeVisible()
  })
})
