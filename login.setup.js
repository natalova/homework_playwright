//const { test as setup, expect } = require('@playwright/test');
import {test as setup, expect} from '@playwright/test'
import {STORAGE_STATE} from '../homework_playwright/playwright.config'


setup ('make login', async({ page }) => {
       await page.goto ('/login')
       await page.getByLabel('Email').fill('email@dmytro.com')
       await page.getByLabel('Пароль').fill('abc123')
       await page.locator("button[type='submit']").click()

       await expect(page.locator('span.card-title').nth(0)).toBeVisible()
       await page.context().storageState({ path: STORAGE_STATE })


})