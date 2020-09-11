<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title class="px-0">
            <h1>{{ title }}</h1>
          </v-card-title>
          <v-card-text class="px-0">{{ description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="d-flex flex-column"
      >
        <v-card
          class="flex d-flex flex-column justify-between"
          :to="item.Nursery"
          append
        >
          <div class="flex-grow-1">
            <v-card-title class="text-break text-wrap">
              {{ item.Nursery }}
            </v-card-title>
          </div>

          <v-list class="flex-grow-1 d-flex flex-column justify-between">
            <v-list-item three-line>
              <v-list-item-icon>
                <v-icon>{{ mdiMapMarker }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="d-flex justify-between">
                <v-list-item-title class="text-break text-wrap">
                  <span>{{ item.Address }}</span>
                </v-list-item-title>
                <v-list-item-subtitle class="align-self-end"
                  >Address</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon>{{ mdiPhone }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <span>{{ item['Contact number'] }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>Contact number</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMapMarker, mdiPhone } from '@mdi/js'
import { startCase } from 'lodash-es'
export default {
  async fetch() {
    const result = await this.$content('nurseries').fetch()
    const { body } = result
    this.items = body
  },
  data: () => ({
    items: [],
    mdiMapMarker,
    mdiPhone,
    title: 'Nurseries',
    description:
      "Nurseries and outlets that can supply free native plants under Brisbane City Council's Free Native Plants Program.",
  }),
  methods: {
    startCase,
    truncate(text = '', stop = 150, clamp = '...') {
      return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`
    },
  },
  head() {
    return {
      title: this.title,
      description: this.description,
    }
  },
}
</script>
