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
            <v-container
              v-if="$vuetify.breakpoint.lgAndUp"
              class="fill-height align-items-end justify-start pb-0"
            >
              <v-row class="align-self-end pb-0" align="end" justify="start">
                <v-col class="pa-0">
                  <v-card style="background: rgba(0, 0, 0, 0.3);">
                    <v-card-title>
                      <h1 class="text-break text-wrap">{{ item.species }}</h1>
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
              {{ item.species.split('(')[0].trim() }}
            </v-card-title>
            <v-card-subtitle class="pb-0 font-italic">{{
              item.species.split('(')[1].replace(/\)+$/, '').trim()
            }}</v-card-subtitle>
          </div>

          <v-card-text class="flex-grow-1 text--primary">
            {{ item.description }}
          </v-card-text>

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
      return { item: body.find((item) => item.species === id) ?? {} }
    } catch {
      context.error({ statusCode: 404 })
    }
  },
  data: () => ({
    item: {},
    mdiArrowRight,
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
