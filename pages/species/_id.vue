<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column">
        <v-card class="flex d-flex flex-column justify-between">
          <v-img
            :lazy-src="
              item.image
                ? require(`@/assets/img/species/${item.image}?resize&sizes[]=1785&placeholder&lqip`)
                    .src
                : null
            "
            :src="
              item.image
                ? require(`@/assets/img/species/${item.image}?resize&sizes[]=1785&placeholder`)
                    .src
                : null
            "
            :aspect-ratio="640 / 360"
            :src-set="
              item.image
                ? require(`@/assets/img/species/${item.image}?resize&max=1785&min=320&steps=6&webp&placeholder`)
                    .srcSet
                : null
            "
            dark
          >
            <v-container class="fill-height align-items-end justify-start pb-0">
              <v-row class="align-self-end pb-0" align="end" justify="start">
                <v-col class="pa-0">
                  <v-card style="background: rgba(0, 0, 0, 0.3);">
                    <v-card-title v-if="$vuetify.breakpoint.smAndUp">
                      <h1 class="text-break text-wrap">{{ item.species }}</h1>
                    </v-card-title>
                    <v-card-text class="caption text-no-wrap">
                      {{ item.credit }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-img>

          <div v-if="$vuetify.breakpoint.smAndDown">
            <v-card-title>
              {{ item.species.split('(')[0].trim() }}
            </v-card-title>
            <v-card-subtitle class="pb-0 font-italic">{{
              item.species.split('(')[1].replace(/\)+$/, '').trim()
            }}</v-card-subtitle>
          </div>

          <v-card-subtitle class="flex-grow-1">
            {{ item.description }}
          </v-card-subtitle>

          <div>
            <v-card-subtitle class="pb-0">Category</v-card-subtitle>
            <v-card-text class="text--primary">
              {{ item.type }}
            </v-card-text>
            <template v-if="item.attracts">
              <v-card-subtitle class="pb-0">
                Attracts
              </v-card-subtitle>
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
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { startCase } from 'lodash-es'
export default {
  async asyncData(context) {
    try {
      const id = context.route.params.id
      const result = await context.$content('species').fetch()
      const { body } = result
      return { item: body.find((item) => item.species === id) ?? {} }
    } catch {
      context.error({ statusCode: 404 })
    }
  },
  data: () => ({
    item: {},
  }),
  methods: {
    startCase,
  },
  head() {
    return {
      title: this.item.species,
    }
  },
}
</script>
