<template>
  <v-container
    class="pa-0 hidden-print-only"
    fluid
    style="min-height: 500px; max-width: 1785px"
  >
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <client-only>
          <v-carousel
            cycle
            hide-delimiters
            continuous
            :interval="10000"
            :show-arrows-on-hover="_carousel"
            :show-arrows="_carousel"
          >
            <v-carousel-item
              v-for="(item, i) in _items"
              :key="i"
              :lazy-src="$img(item.src, { width: 10, quality: 70 })"
              :src="
                $img(item.src, { quality: 70, height: 500, width: '100vw' })
              "
              :srcset="_srcset(item.src).srcset"
              :height="height"
              :sizes="_srcset(item.src).size"
              :gradient="gradient"
              eager
            >
              <slot name="item" :item="item">
                <v-container
                  class="fill-height align-items-end justify-start"
                  fluid
                >
                  <v-row align="center" justify="center">
                    <v-col class="text-center" cols="12">
                      <h1 v-if="heading" class="mb-4 text-shadow">
                        {{ heading }}
                      </h1>
                      <h2 v-if="subheading" class="subheading text-shadow">
                        {{ subheading }}
                      </h2>
                    </v-col>
                  </v-row>
                </v-container>
              </slot>
            </v-carousel-item>
          </v-carousel>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => null },
    heading: { type: String, default: null },
    subheading: { type: String, default: null },
    alt: { type: String, default: '' },
    gradient: {
      type: String,
      default: null,
    },
    width: { type: [Number, String], default: 1280 },
    height: { type: [Number, String], default: 500 },
    color: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      default: '/cover.jpg',
    },
  },
  head() {
    const { src: image } = this._items[0] || { src: this.src }
    return {
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.$config.BASE_URL}${this.$img(image, {
            width: 1280,
            height: 630,
          })}`,
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: 1280,
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: 630,
        },
      ],
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: `${this.$config.BASE_URL}${this.$img(image, {
            width: 1280,
            height: 630,
          })}`,
          imagesrcset: this._srcset(image).srcset,
          imagesizes: this._srcset(image).size,
        },
      ],
    }
  },
  computed: {
    _carousel() {
      return this._items.length > 1
    },
    _items() {
      return (this.items || [{ src: this.src }]).filter(({ src }) => {
        return src
      })
    },
  },
  methods: {
    _srcset(image) {
      return this.$img.getSizes(image, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
          height: 500,
        },
      })
    },
  },
}
</script>
