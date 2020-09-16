/* eslint-disable no-undef */

Feature('About')

Scenario('Heading 1', async (I) => {
  I.amOnPage('/')
  I.see('Brisbane City Council’s Free Native Plants Program', 'h1')

  I.saveScreenshot('about.png')
  await I.seeVisualDiff('about.png')
})
