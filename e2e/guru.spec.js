// npx playwright test --headed --project chromium
// npx playwright test guru.spec.js --headed --project chromium
// npx playwright test guru.spec.js --headed --project chromium --workers 1
// ENV_URL=https://guru99.com/ npx playwright test guru.spec.js --headed --project chromium
// URL=1 npx playwright test guru.spec.js --headed --project chromium
// URL=2 npx playwright test guru.spec.js --headed --project chromium

const { test, expect } = require('@playwright/test');

//test.describe.configure({ mode: 'serial' })
test.describe('Open Guru website', () => {
    

    test.beforeEach(async ({ page }) => {
        // await page.goto('https://guru99.com/')
        await page.goto('/')
      })
    
    test('open the page', async ({ page }) => {
        // await page.goto('https://guru99.com/')      
        await expect(page.getByText('Tutorials Librar')).toBeVisible

    })
    test('test1', async ({ page }) => {
        // await page.goto('https://www.guru99.com/');
        await page.getByRole('link', { name: '➤ Software Testing' }).click();
        // await page.getByRole('heading', { name: 'What should I know?' }).click();
        // await page.getByTitle('What is Software Testing? Definition, Basics & Types').click();
        // await expect (page.getByLabel('Collapse Table of Contents')).toBeVisible;

      });

    test('test2', async ({ page }) => {
        // await page.goto('https://www.guru99.com/');
        await page.locator("xpath=//a[@href='/tensorflow-tutorial.html'][text()='➤ TensorFlow']").click()
        await expect(page.locator ('//h2[text()="What is TensorFlow?"]')).toBeVisible()
      
    });

    test('test3', async ({ page }) => {
        // await page.goto('https://www.guru99.com/');
        const linkNltk = page.locator('a[href="/nltk-tutorial.html"]')
        const articleAdded = page.locator("xpath=//time")
        const textNltkSylabus = page.locator("xpath=//h2[text()='NLTK Tutorial Syllabus']")
        const tutorialLink = page.locator('tr td a')
        const textWhatIsSeq = page.locator("xpath=//h2[text()='What is Seq2Seq?']")

        await linkNltk.click()
        await expect(articleAdded).toContainText('September 30, 2023')
        await textNltkSylabus.press('Enter')
        await tutorialLink.nth(7).click()
        await textWhatIsSeq.waitFor({state: 'visible', timeout:5000})
        await expect(textWhatIsSeq).toBeVisible()
      
    })

//тест не рабочий
    test.skip('test4', async ({ page }) => {
        const textWhatIsSeq = page.locator("xpath=//h2[text()='What is Seq2Seq?']")
        const textWhatIsSeq33 = page.locator("xpath=//h2[text()='What is Seq2Seq33']")
// или с помощью синтаксиса 
        await expect(textWhatIsSeq.or (textWhatIsSeq33)).toBeVisible()
// или с помощью оператора if 
        await page.goto('/seq2seq-model.html')
        if (await textWhatIsSeq33.isVisible()) {
            await page.locator('NON.VISIBLE.LOCATOR').click()
        }
        await expect(textWhatIsSeq).toBeVisible()

    })

    test('test5', async ({ page }) => {
        const input = page.locator('input.gsc-input')
        
        await page.mouse.down()
        await page.mouse.up()

        await page.locator('div.g-content').screenshot({path: 'screenshots/header_with_search.png'})
        await expect(page).toHaveScreenshot('screenshots/main-page-snapshot.png')
        await input.click()
        await input.fill('sap')
        await page.screenshot({path: 'screenshots/sap_in_search_input_false.png', fullPage: false})
        await input.clear()
        await input.pressSequentially('SAP')
        await input.pressSequentially('Tutorial', {delay: 200})
    })

})
