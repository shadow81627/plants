<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ item.Nursery }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-list>
            <v-list-item
              :href="`https://www.google.com.au/maps/search/?api=1&query=${item.Address}`"
              target="_blank"
            >
              <v-list-item-icon>
                <v-icon>{{ mdiMapMarker }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <span>{{ item.Address }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :href="`tel:${item['Contact number']}`">
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
    <v-row>
      <v-col>
        <v-card>
          <map-box
            :lat="Number(item.LATITUDE)"
            :lng="Number(item.LONGITUDE)"
          ></map-box>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMapMarker, mdiPhone } from '@mdi/js'
import { startCase } from 'lodash-es'
import MapBox from '@/components/MapBox'
export default {
  components: {
    MapBox,
  },
  async asyncData(context) {
    try {
      const id = context.route.params.id
      const result = await context.$content('nurseries').fetch()
      const { body } = result
      return { item: body.find((item) => item.Nursery === id) }
    } catch {
      context.error({ statusCode: 404 })
    }
  },
  data: () => ({
    item: {},
    mdiMapMarker,
    mdiPhone,
  }),
  methods: {
    startCase,
    truncate(text = '', stop = 150, clamp = '...') {
      return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`
    },
  },
  head() {
    return {
      title: this.item.Nursery,
    }
  },
}
</script>
