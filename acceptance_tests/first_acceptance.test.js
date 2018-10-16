const puppeteer = require('puppeteer')

let browser
let page

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch(
    {
      headless: true // headless mode set to false so browser opens up with visual feedback
    }
  )
  // creates a new page in the opened browser
  page = await browser.newPage()
})

describe('Login', () => {
  test('users can login', async () => {
    await page.goto('http://localhost:3001')
    await page.click('input[name=email]')
    await page.type('input[name=email]', 'y_test111+role1@outlook.com')
    await page.click('input[name=password]')
    await page.type('input[name=password]', 'Sunil@0575')
    const [response] = await Promise.all([
      page.waitForNavigation({waitUntil: 'load'}),
      page.click('#submit')
    ])
    await page.waitForSelector('#div-forgot-password-msg')
    await expect(page).toMatch('Account Verification')
  }, 1600000)
})

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
  browser.close()
})
