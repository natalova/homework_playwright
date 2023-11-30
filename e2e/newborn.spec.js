// ENV_URL=http://5.189.186.217 npx playwright test newborn.spec.js --headed --project chromium


const { test, expect } = require('@playwright/test');
const { MainPageNewborn } = require('./pages/mainPageNewborn')


test.describe ('Verification steps for newborn website', () => {
   const USER = {
            email: 'email@dmytro.com',
            pwd: 'abc123',
            token: ''
   }
  
    test.beforeAll(async({request}) => {
        const response = await request.post(
            '/api/auth/login',{
            data: {
            email: USER.email,
            password: USER.pwd
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        expect(body).toHaveProperty('token')
        USER.token = body.token
        console.log('AUTH', USER.token)
    })

    test.beforeEach(async ({page}) => {
        page.addInitScript((value) => {
            window.localStorage.setItem('auth-token', value)
        }, USER.token)
        await page.goto('/overview')
    })

    test('check the state after open the page', async ({ page }) => {
        //await page.goto('/')      
        await expect(page.locator('span.card-title').nth(0)).toBeVisible()
        await expect(page.locator('div.row span.card-title').nth(0)).toHaveText('Виручка:')
    })

    test.skip('usage POM', async ({ page }) => {
        const mainpagenewborn = new MainPageNewborn(page)
        mainpagenewborn.verifyLogoutVisible()
    })

    test('without POM', async ({ page }) => {
        await expect(page.locator('ul > li.bold.last > a')).toHaveText('Вийти')
    })

})
