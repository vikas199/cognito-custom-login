const puppeteer = require('puppeteer')

let browser
let page

const baseUrl = 'http://localhost:3000'

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

describe('Login page', () => {
  test('loads successfully', async () => {
    await page.goto(baseUrl)
    await expect(page).toMatchElement('input', {name: 'email'})
    await expect(page).toMatchElement('input', {name: 'password'})

    await expect(page).toMatch('Log In')
  })

  xtest('users can login', async () => {
    // test skipped
    await page.goto(baseUrl)
    await page.click('input[name=email]')
    await page.type('input[name=email]', 'y0_test111+role1@outlook.com')
    await page.click('input[name=password]')
    await page.type('input[name=password]', 'Sunil@0575')
    const [response] = await Promise.all([
      page.waitForNavigation({waitUntil: 'load'}),
      page.click('#submit')
    ])
    await page.waitForSelector('#div-forgot-password-msg')
    await expect(page).toMatch('Account Verification')
  })
})

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
  // browser.close()
})
