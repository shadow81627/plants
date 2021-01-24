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
      <v-col>
        <v-select
          v-model="category"
          label="Category"
          name="type"
          :items="types"
          clearable
        >
        </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="attracts"
          label="Attracts"
          name="attracts"
          :items="attractsOptions"
          clearable
        >
        </v-select>
      </v-col>
    </v-row>
    <v-data-iterator
      :items="list"
      hide-default-footer
      :loading="$fetchState.pending"
      :items-per-page="-1"
      item-key="Species"
    >
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="(item, index) in items"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            xlg="3"
            class="d-flex flex-column"
          >
            <v-card class="flex d-flex flex-column justify-between" ripple>
              <v-card
                :to="encodeURIComponent(item.species)"
                append
                flat
                class="flex d-flex flex-column justify-between flex-grow-1"
                :ripple="false"
              >
                <v-img
                  :lazy-src="src(`./${item.image}`).placeholder"
                  :src="src(`./${item.image}`).src"
                  :srcset="src(`./${item.image}`).srcSet"
                  :aspect-ratio="16 / 9"
                  :style="{
                    backgroundColor: backgroundColor(`./${item.image}`)[0],
                  }"
                />
                <v-card-title>
                  {{ startCase(item.species.split('(')[0].trim()) }}
                </v-card-title>
                <v-card-subtitle class="pb-0 font-italic">{{
                  item.species
                    .split('(')[1]
                    .replace(/seasonal$/, '')
                    .replace(/-/, '')
                    .trim()
                    .replace(/\)+$/, '')
                    .trim()
                }}</v-card-subtitle>
                <v-card-subtitle class="flex-grow-1">
                  {{ truncate(item.description) }}
                </v-card-subtitle>
                <div class="flex-shrink-1">
                  <v-card-subtitle class="pb-0">Category</v-card-subtitle>
                  <v-card-text class="text--primary">
                    {{ item.type }}
                  </v-card-text>
                </div>
              </v-card>

              <div class="flex-shrink-1">
                <template v-if="item.attracts">
                  <v-card-subtitle class="pb-0"> Attracts </v-card-subtitle>
                  <v-card-text>
                    <v-chip
                      v-for="attract in item.attracts.split(',').sort()"
                      :key="attract"
                      :color="
                        attracts === attract.toLowerCase().trim()
                          ? 'primary'
                          : null
                      "
                      @click="attracts = attract.toLowerCase().trim()"
                    >
                      {{ startCase(attract) }}
                    </v-chip>
                  </v-card-text>
                  <!-- <v-card-actions class="pa-0 flex-grow-1">
                    <v-btn
                      color="#e0e0e0"
                      :to="item.species"
                      append
                      small
                      block
                      tile
                      width="100%"
                    >
                      Read more
                      <v-icon small absolute>{{ mdiArrowRight }}</v-icon>
                    </v-btn>
                  </v-card-actions> -->
                </template>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'
import { startCase, uniq, debounce, flatten } from 'lodash-es'
export default {
  // fetchOnServer: false,
  data: () => ({
    list: [],
    content: [],
    mdiArrowRight,
    title: 'Native Plant Species',
    description:
      'Brisbane City Council offers a variety of native plant species for residents and entities through the Free Native Plant Program, suitable for all garden types and sizes.',
  }),
  async fetch() {
    const result = await this.$content('species').fetch()
    const { body } = result
    this.content = body
    const filtered = body.filter((item) => {
      const category = this.category ? item.type === this.category : true
      const attracts = this.attracts
        ? flatten(
            item.attracts.split(',').map((str) => str.toLowerCase().trim())
          ).includes(this.attracts)
        : true
      return category && attracts
    })
    this.list = filtered ?? []

    if (process.browser) {
      // scroll to top on data change
      this.scrollToTop()
    }
  },
  head() {
    return {
      title: this.title,
      description: this.description,
    }
  },
  computed: {
    types() {
      const values = uniq(
        this.content.map((item) => ({ value: item.type, text: item.type }))
      )
      return values
    },
    attractsOptions() {
      const attractsOptions = uniq(
        flatten(
          this.content.map((item) =>
            item.attracts.split(',').map((str) => str.toLowerCase().trim())
          )
        )
      )
      const values = attractsOptions.map((item) => ({
        value: item,
        text: startCase(item),
      }))

      return values
    },
    attracts: {
      get() {
        return this.$route.query.attracts
      },
      set(value) {
        this.$router.replace({
          query: { ...this.$route.query, attracts: value },
        })
      },
    },
    category: {
      get() {
        return this.$route.query.category
      },
      set(value) {
        this.$router.replace({
          query: { ...this.$route.query, category: value },
        })
      },
    },
  },
  watch: {
    '$route.query': debounce(function () {
      this.$fetch()
    }, 250),
  },
  methods: {
    startCase,
    truncate(text = '', stop = 150, clamp = '...') {
      return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    backgroundColor: require.context(
      '~/assets/img/species?lqip-colors',
      false,
      /\.(png|jpe?g|svg).*$/
    ),
    src: require.context(
      `~/assets/img/species?resize&sizes[]=320&sizes[]=640&sizes[]=960&placeholder&format=webp`,
      false,
      /\.(png|jpe?g|svg).*$/
    ),
  },
}
</script>
