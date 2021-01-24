<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column">
        <v-card class="flex d-flex flex-column justify-between">
          <v-img
            :lazy-src="src(`./${item.image}`).placeholder"
            :src="src(`./${item.image}`).src"
            :srcset="src(`./${item.image}`).srcSet"
            :aspect-ratio="16 / 9"
            :style="{
              backgroundColor: backgroundColor(`./${item.image}`)[0],
            }"
            sizes="(max-width: 1785px) 100vw, 1785px"
            dark
          >
            <v-container
              v-if="$vuetify.breakpoint.lgAndUp"
              class="fill-height align-items-end justify-start pb-0"
            >
              <v-row class="align-self-end pb-0" align="end" justify="start">
                <v-col class="pa-0">
                  <v-card style="background: rgba(0, 0, 0, 0.3)">
                    <v-card-title>
                      <h1 class="text-break text-wrap">
                        {{ startCase(item.species.split('(')[0].trim()) }} ({{
                          item.species.split('(')[1].replace(/\)+$/, '').trim()
                        }})
                      </h1>
                    </v-card-title>
                    <!-- <v-card-text class="caption text-no-wrap">
                      {{ item.credit }}
                    </v-card-text> -->
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-img>

          <div v-if="$vuetify.breakpoint.mdAndDown">
            <v-card-title>
              {{ startCase(item.species.split('(')[0].trim()) }}
            </v-card-title>
            <v-card-subtitle class="pb-0 font-italic">{{
              item.species.split('(')[1].replace(/\)+$/, '').trim()
            }}</v-card-subtitle>
          </div>

          <v-card-text class="flex-grow-1 text--primary">
            {{ item.description }}
          </v-card-text>

          <v-container v-if="waterwise">
            <v-row>
              <v-col>
                <v-card-subtitle class="pb-0">Width</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Spread Ranges'] }}
                </v-card-text>
                <v-card-subtitle class="pb-0">Height</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Height Ranges'] }}
                </v-card-text>
                <v-card-subtitle class="pb-0">Category</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Plant Type'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Water Needs</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Water Needs'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Light Needs</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Light Needs'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Maintenance</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Maintenance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0"
                  >Bore water Tolerance</v-card-subtitle
                >
                <v-card-text class="text--primary">
                  {{ waterwise['Bore water Tolerance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Frost Tolerance</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Frost Tolerance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0"
                  >Greywater Tolerance</v-card-subtitle
                >
                <v-card-text class="text--primary">
                  {{ waterwise['Greywater Tolerance'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Edible</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Edible'] }}
                </v-card-text>
              </v-col>
              <v-col>
                <v-card-subtitle class="pb-0">Perfume</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Perfume'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Aromatic</v-card-subtitle>
                <v-card-text class="text--primary">
                  {{ waterwise['Aromatic'] }}
                </v-card-text>

                <v-card-subtitle class="pb-0">Colours</v-card-subtitle>
                <v-card-text class="text--primary">
                  <span
                    v-for="color in require(`@/assets/img/species/${item.image}?lqip-colors`)"
                    :key="color"
                  >
                    <span style="display: inline-flex; align-self: bottom">
                      <svg
                        style="
                          height: 1em;
                          width: 1em;
                          top: 0.125em;
                          position: relative;
                        "
                      >
                        <rect
                          :fill="color.toLowerCase()"
                          style="height: 1em; width: 1em"
                        ></rect>
                      </svg>
                    </span>
                    <!-- <span>{{ color }}</span> -->
                    <!-- <span> </span> -->
                  </span>
                </v-card-text>

                <v-card-subtitle class="pb-0">Flower Colour</v-card-subtitle>
                <v-card-text class="text--primary">
                  <span
                    v-for="color in waterwise['Flower colour'].split(' and ')"
                    :key="color"
                  >
                    <!-- <span style="display: inline-flex; align-self: bottom;">
                      <svg
                        style="
                          height: 1em;
                          width: 1em;
                          top: 0.125em;
                          position: relative;
                        "
                      >
                        <rect
                          :fill="color.toLowerCase()"
                          style="height: 1em; width: 1em;"
                        ></rect>
                      </svg>
                    </span> -->
                    <span>{{ startCase(color) }}</span>
                    <span> </span>
                  </span>
                </v-card-text>

                <v-card-subtitle class="pb-0">Foliage Colour</v-card-subtitle>
                <v-card-text class="text--primary">
                  <span
                    v-for="color in waterwise['Foliage Colour'].split(' and ')"
                    :key="color"
                  >
                    <!-- <span style="display: inline-flex; align-self: bottom;">
                      <svg
                        style="
                          height: 1em;
                          width: 1em;
                          top: 0.125em;
                          position: relative;
                        "
                      >
                        <rect
                          :fill="color.toLowerCase()"
                          style="height: 1em; width: 1em;"
                        ></rect>
                      </svg>
                    </span> -->
                    <span>{{ startCase(color) }}</span>
                    <span> </span>
                  </span>
                </v-card-text>

                <template v-if="waterwise['Climate Zones']">
                  <v-card-subtitle class="pb-0">
                    Climate Zones
                  </v-card-subtitle>
                  <v-card-text>
                    <v-chip
                      v-for="i in waterwise['Climate Zones'].split(',').sort()"
                      :key="i"
                      readonly
                    >
                      {{ startCase(i) }}
                    </v-chip>
                  </v-card-text>
                </template>

                <template v-if="waterwise['Soil Type']">
                  <v-card-subtitle class="pb-0"> Soil Type </v-card-subtitle>
                  <v-card-text>
                    <v-chip
                      v-for="i in waterwise['Soil Type'].split(',').sort()"
                      :key="i"
                      readonly
                    >
                      {{ startCase(i) }}
                    </v-chip>
                  </v-card-text>
                </template>

                <template v-if="waterwise['Soil Additional']">
                  <v-card-subtitle class="pb-0"
                    >Soil Additional</v-card-subtitle
                  >
                  <v-card-text class="text--primary">
                    {{ waterwise['Soil Additional'] }}
                  </v-card-text>
                </template>

                <template v-if="waterwise['Abcission']">
                  <v-card-subtitle class="pb-0"
                    >Abcission (when it makes a mess eg. drops
                    leaves)</v-card-subtitle
                  >
                  <v-card-text class="text--primary">
                    {{ waterwise['Abcission'] }}
                  </v-card-text>
                </template>

                <template v-if="item.attracts">
                  <v-card-subtitle class="pb-0"> Attracts </v-card-subtitle>
                  <v-card-text>
                    <v-chip
                      v-for="attract in item.attracts.split(',').sort()"
                      :key="attract"
                      readonly
                    >
                      {{ startCase(attract) }}
                    </v-chip>
                  </v-card-text>
                </template>
              </v-col>
            </v-row>
          </v-container>

          <v-card-subtitle class="pb-0">Image License</v-card-subtitle>
          <v-card-text class="text--primary">
            {{ item.credit }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text to="/nurseries">
              See Nurseries
              <v-icon>{{ mdiArrowRight }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'
import { startCase } from 'lodash-es'
export default {
  async asyncData(context) {
    try {
      const id = context.route.params.id
      const result = await context.$content('species').fetch()
      const { body } = result
      const item = body.find((item) => item.species === id) ?? {}

      const { body: waterwiseBody = [] } = await context
        .$content('waterwise-plants')
        .fetch()
      const waterwise = waterwiseBody.find((i) => {
        const commonName = startCase(item.species.split('(')[0].trim())
        const botanicalName = item.species
          .split('(')[1]
          .replace(/seasonal$/, '')
          .replace(/-/, '')
          .trim()
          .replace(/\)+$/, '')
          .trim()
        return (
          i['Common Name'] === commonName ||
          i['Botanical Name'] === botanicalName ||
          i['Previous Name'] === botanicalName ||
          i['Botanical Name'].startsWith(
            botanicalName.replace(/sp\.$/, '').trim()
          )
        )
      })
      return { item, waterwise }
    } catch {
      context.error({ statusCode: 404 })
    }
  },
  data: () => ({
    item: {},
    waterwise: {},
    mdiArrowRight,
  }),
  head() {
    return {
      title: this.item.species,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.item.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.$config.BASE_URL}${
            this.cover(`./${this.item.image}`).src
          }`,
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: this.cover(`./${this.item.image}`).width,
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: this.cover(`./${this.item.image}`).height,
        },
      ],
    }
  },
  computed: {
    commonName() {
      return startCase(this.item.species.split('(')[0].trim())
    },
    botanicalName() {
      return this.item.species.split('(')[1].replace(/\)+$/, '').trim()
    },
  },
  methods: {
    startCase,
    backgroundColor: require.context(
      '~/assets/img/species?lqip-colors',
      false,
      /\.(png|jpe?g|svg).*$/
    ),
    src: require.context(
      `~/assets/img/species?resize&sizes[]=320&sizes[]=600&sizes[]=900&sizes[]=1785&sizes[]=4686&placeholder&format=webp`,
      false,
      /\.(png|jpe?g|svg).*$/
    ),
    cover: require.context(
      `~/assets/img/species?resize&size=1200&format=jpg`,
      false,
      /\.(png|jpe?g|svg).*$/
    ),
  },
}
</script>
