//npx playwright test nata_hw25.spec.js --headed --project chromium
const { test, expect } = require('@playwright/test');
    
    test('open the page', async ({ page }) => {
        await page.goto('/')      
        await expect(page.locator('span.card-title').nth(0)).toBeVisible()

    })

