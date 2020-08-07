<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Brisbane Native Plant Species</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex flex-column"
      >
        <v-card class="flex d-flex flex-column justify-between">
          <v-img
            :lazy-src="
              item.Image
                ? require(`@/assets/img/species/${item.Image}?lqip&resize&sizes=256`)
                    .src
                : null
            "
            :src="
              item.Image
                ? require(`@/assets/img/species/${item.Image}?lqip&resize&sizes=256`)
                    .src
                : null
            "
            height="256"
            :src-set="
              item.Image
                ? require(`@/assets/img/species/${item.Image}?webp&resize&sizes[]=256&sizes[]=512&sizes[]=768`)
                    .srcSet
                : null
            "
          />
          <v-card-title>
            {{ item.Species.split('(')[0].trim() }}
          </v-card-title>
          <v-card-subtitle class="pb-0 font-italic">{{
            item.Species.split('(')[1].replace(/\)+$/, '').trim()
          }}</v-card-subtitle>
          <v-card-subtitle>
            {{ truncate(item['Description and growing requirements']) }}
          </v-card-subtitle>

          <div>
            <v-card-subtitle class="pb-0">Category</v-card-subtitle>
            <v-card-text class="text--primary">
              {{ item.Type }}
            </v-card-text>
            <template v-if="item.Attracts">
              <v-card-subtitle class="pb-0">
                Attracts
              </v-card-subtitle>
              <v-card-text>
                <v-chip
                  v-for="attract in item.Attracts.split(',')"
                  :key="attract"
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
  async fetch() {
    const result = await this.$content('species').fetch()
    const { body } = result
    this.items = body
  },
  data: () => ({
    items: [],
  }),
  methods: {
    startCase,
    truncate(text = '', stop = 150, clamp = '...') {
      return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`
    },
  },
  head() {
    return {
      title: 'Plant Species',
    }
  },
}
</script>
