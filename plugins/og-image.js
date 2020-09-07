import { shuffle, head } from 'lodash-es'

/**
 * Set a random image for meta og:image
 */
export default async (context) => {
  const content = await context.$content('species').fetch()
  const { body } = content
  const { image } = head(shuffle(body.filter((item) => item.image)))

  const src = require.context(
    `~/assets/img/species?resize&size=640&format=webp`,
    false,
    /\.(png|jpe?g|svg).*$/
  )

  context.app.head.meta = context.app.head.meta.concat(
    {
      hid: 'og:image',
      property: 'og:image',
      content: src(`./${image}`).src,
      once: true,
    },
    {
      hid: 'og:image:width',
      property: 'og:image:width',
      content: src(`./${image}`).width,
      once: true,
    },
    {
      hid: 'og:image:height',
      property: 'og:image:height',
      content: src(`./${image}`).height,
      once: true,
    }
  )
}
