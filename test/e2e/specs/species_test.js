/* eslint-disable no-undef */

Feature('Species')

Scenario('Find a Species', async ({ I }) => {
  I.amOnPage('/species')
  I.click(
    '#app > div > main > div > div > div.v-data-iterator > div > div:nth-child(1) > div > a'
  )

  I.saveScreenshot('species_list.png')
  await I.seeVisualDiff('species_list.png', {
    prepareBaseImage: true,
    tolerance: 1,
  })

  I.amOnPage('/species/Creeping%20boobialla%20(Myoporum%20parvifolium)')
  I.saveScreenshot('species_details.png')
  await I.seeVisualDiff('species_details.png', {
    prepareBaseImage: true,
    tolerance: 1,
  })
})
