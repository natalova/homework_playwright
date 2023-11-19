// npx playwright test nata_hw23.spec.js --headed --project chromium
// npx playwright test nata_hw23.spec.js --project chromium
// npx playwright test nata_hw23.spec.js --headed --project chromium --workers 1

const { test, expect } = require('@playwright/test');

test.describe('Search', () => {
    

    test.beforeEach(async ({ page }) => {
        await page.goto('https://guru99.com/')
      })


      test('Search main field', async ({ page }) => {
        const inputFieldMain = page.locator('input.gsc-input')
        const headerBlock = page.locator('.g-content.g-particle')
        const searchBtnMain = page.locator('button.gsc-search-button')
        const searchResultMain = page.locator('.gsc-wrapper')
        const searchResultMainClose = page.locator('.gsc-results-close-btn')
        
        await headerBlock.hover()
        await inputFieldMain.click()
        await inputFieldMain.fill('Software')
        await inputFieldMain.clear()
        await inputFieldMain.pressSequentially('Software testing', {delay: 200})
        await searchBtnMain.click()
        await expect(searchResultMain).toBeVisible()
        await expect(searchResultMain).toContainText( "Software testing");
        await searchResultMainClose.click()
        await inputFieldMain.pressSequentially('testetstet123', {delay: 200})
        await searchBtnMain.click()
        await expect(searchResultMain).toBeVisible()
        await expect(searchResultMain).toContainText("No Result");
        
   
    })


    test('Search icon', async ({ page }) => {
        const homePageTitle = page.locator ('h3')
        const searchBtn = page.locator('span.search-toggle-icon')
        const inputFieldHomePage = page.locator('input.search-field')
        const closeBtn = page.getByLabel('Close search')


        await expect(homePageTitle).toBeVisible()
        await expect(homePageTitle).toContainText("Guru99 is totally new kind of learning experience.")
        await expect(searchBtn).toBeVisible()
        await searchBtn.click()
        await expect(inputFieldHomePage).toBeVisible()
        await page.keyboard.type('software testing', {delay: 200})
        await closeBtn.click()
        await searchBtn.click()
        await expect(inputFieldHomePage).toBeVisible()

    })

    test('Search result', async ({ page }) => {
        const searchBtn = page.locator('span.search-toggle-icon')
        const inputFieldHomePage = page.locator('input.search-field')
        const inputFieldSearchPage = page.locator('#gs_tti50')
        const delBtnSearchPage = page.locator('.gscb_a')
        const searchBtnSearchPage = page.locator('button.gsc-search-button')

        await searchBtn.click()
        await expect(inputFieldHomePage).toBeVisible()
        await inputFieldHomePage.click()
        await page.keyboard.type('software testing', {delay: 200})
        await inputFieldHomePage.press('Enter')
        await expect(page).toHaveTitle("Search Results")
        await expect(page).toHaveURL('https://www.guru99.com/search_gcse?q=software+testing')
        await expect(inputFieldSearchPage).toBeVisible()
        await inputFieldSearchPage.click()
        await delBtnSearchPage.click()
        await inputFieldSearchPage.pressSequentially('qa testing tools', {delay: 200})
        await searchBtnSearchPage.click()
        await expect(page).toHaveURL('https://www.guru99.com/search_gcse?q=software+testing')
    })

})
