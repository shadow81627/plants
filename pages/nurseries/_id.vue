<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ item.Nursery }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-column">
        <v-card class="flex d-flex flex-column justify-between">
          <!-- <v-img
            :lazy-src="
              item.Image
                ? require(`@/assets/img/species/${item.Image}?resize&size=256&lqip&placeholder`)
                    .src
                : null
            "
            :src="
              item.Image
                ? require(`@/assets/img/species/${item.Image}?resize&size=256&lqip&placeholder`)
                    .src
                : null
            "
            height="256"
            max-height="256"
            :src-set="
              item.Image
                ? require(`@/assets/img/species/${item.Image}?resize&sizes[]=256&sizes[]=512&sizes[]=768&webp&placeholder`)
                    .srcSet
                : null
            "
          /> -->
          <v-card-subtitle class="pb-0">Address</v-card-subtitle>
          <v-card-text class="flex-grow-1">
            <v-btn
              icon
              :href="`https://www.google.com.au/maps/search/?api=1&query=${item.Address}`"
              target="_blank"
            >
              <v-icon>{{ mdiMapMarker }}</v-icon>
            </v-btn>
            <span>{{ item.Address }}</span>
          </v-card-text>

          <div>
            <v-card-subtitle class="pb-0">Contact number</v-card-subtitle>
            <v-card-text class="text--primary">
              <v-btn
                icon
                :href="`tel:${item['Contact number']}`"
                target="_blank"
              >
                <v-icon>{{ mdiPhone }}</v-icon>
              </v-btn>
              <span>{{ item['Contact number'] }}</span>
            </v-card-text>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
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
