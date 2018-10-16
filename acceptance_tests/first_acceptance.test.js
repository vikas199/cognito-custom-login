// describe('CWS-CARES', () => {
//   beforeAll(async () => {
//     jest.setTimeout(10000)
//     await page.goto('https://web.integration.cwds.io')
//   })

//   it('should display login text on page', async () => {
//     await expect(page).toMatch('Log In')
//   })

//   it('should display Account Verification text on page', async () => {
//     await page.type('#email', 'y_test111+role1@outlook.com')
//     await page.type('#password', 'Sunil@0575')
//     const [response] = await Promise.all([
//       page.waitForNavigation({waitUntil: 'load'}),
//       page.click('button[type=submit]')
//     ])
//     console.log([response])
//     // page.screenshot({ path: 'keyboard.png' })
//     await expect(page).toMatch('Account Verification')
//     // browser.close()
//   })

//   // it('should open a new page', async () => {
//   //   const page = await browser.newPage()
//   //   await page.goto('https://google.com')
//   // })
// })
