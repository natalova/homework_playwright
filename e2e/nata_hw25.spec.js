// npx playwright test nata_hw25.spec.js --headed --project chromium
// npx playwright test nata_hw25.spec.js --project chromium

import { test, expect } from '@playwright/test';
//const { chromium } = require('playwright');

test.describe("User's location", () => {

    test.use({
        colorScheme: 'dark',
//         geolocation: { 
//     longitude: -0.20256, 
//     latitude: 51.90224
// },
// permissions: ['geolocation'],

})

test("the user's location is shown", async ({ page }) => {
    const searchField = page.locator('.gLFyf')
   
    
    
  await page.goto('https://www.google.com/');
    //   await page.goto('https://www.bing.com/maps/');
    
    // await searchField.click()
    // await page.keyboard.type('магазин одягу', {delay: 200})
    // await searchField.press('Enter')
    // await page.waitForSelector('#search')
    
  });




test.skip('Test for GB geolocation', async ({ page }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        geolocation: { longitude: -0.20256, latitude: 51.90224 },
        permissions: ['geolocation']
      });

//     const searchField = page.locator('.gLFyf')
    
// //    // const browser = await chromium.launch();
//     const context = await browser.newContext({
//     geolocation: { // Встановлення геолокації для Британії
//       latitude: 51.509865,
//       longitude: -0.118092,
//     },
//     permissions: ['geolocation'],
//     locale: 'en-GB', // Встановлення локалізації для Британії
//   });
//     const page = await context.newPage();

    await context.setGeolocation({ longitude: -0.20256, latitude: 51.90224 });
    await page.goto('https://www.bing.com/maps')      
    // await searchField.click()
    // await page.keyboard.type('магазин одягу', {delay: 200})
    // await searchField.press('Enter')
    //   // Очікування результатів (це може зайняти кілька секунд)
    // await page.waitForSelector('#search');
    // //await expect(page.getByRole ('textarea')).toBeVisible()
    // await browser.close();
    
   

})
})
