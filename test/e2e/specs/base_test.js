const pages = [
  {
    slug: 'about',
    heading: 'Brisbane City Council’s Free Native Plants Program',
    route: '/',
  },
  {
    slug: 'sources',
    heading: 'Sources',
  },
  {
    slug: 'nurseries',
    heading: 'Nurseries',
  },
  {
    slug: 'species',
    heading: 'Native Plant Species',
  },
]

// eslint-disable-next-line no-undef
Feature('layout')

for (const { slug, heading, route } of pages) {
  // eslint-disable-next-line no-undef
  Scenario(slug, async ({ I }) => {
    I.amOnPage(route ?? `/${slug}`)

    if (heading) {
      I.see(heading, 'h1')
    }

    I.wait(5)
    I.saveScreenshot(`${slug}.png`)
    await I.seeVisualDiff(`${slug}.png`)
  })
}
