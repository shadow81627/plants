<template>
  <div>
    <v-container
      fluid
      class="pa-0"
      style="min-height: 500px; max-width: 1785px"
    >
      <v-row no-gutters>
        <v-col>
          <client-only>
            <v-carousel
              cycle
              hide-delimiters
              continuous
              :interval="10000"
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                eager
                :lazy-src="src(`./${item.image}`).placeholder"
                :src="src(`./${item.image}`).src"
                :srcset="src(`./${item.image}`).srcSet"
                :style="{
                  backgroundColor: backgroundColor(`./${item.image}`)[0],
                }"
                sizes="(max-width: 1785px) 100vw, 1785px"
                height="500"
                :to="`/species/${item.name}`"
              >
                <v-container
                  class="fill-height align-items-end justify-start pb-0"
                  fluid
                >
                  <v-row
                    class="align-self-end pb-0"
                    align="end"
                    justify="start"
                  >
                    <v-col class="pa-0">
                      <v-card style="background: rgba(0, 0, 0, 0.3)">
                        <v-card-text class="pb-0">
                          {{ item.name }}
                        </v-card-text>
                        <v-card-text class="caption">
                          {{ item.credit }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-carousel-item>
            </v-carousel>
          </client-only>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              <h1>Brisbane City Council’s Free Native Plants Program</h1>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="text--primary body-1">
              Brisbane City Council’s Free Native Plants Program offers a range
              of plants to assist the community to plant and green their
              properties. Council offers the Free Native Plants Program to
              residential ratepayers, schools, clubs, body corporates and
              registered community groups within the Brisbane Local Government
              area to plant on their properties. The native species provided
              through the program are designed to help grow our city's urban
              forest and support local wildlife. Further information is
              available on the
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.brisbane.qld.gov.au/clean-and-green/green-home-and-community/sustainable-gardening/free-native-plants-program"
                >Brisbane City Council website</a
              >.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title><h2>Features</h2></v-card-title>
            <v-divider></v-divider>
            <v-list three-line>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-list-item to="/species">
                      <v-list-item-icon>
                        <v-icon>{{ mdiSprout }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Species</v-list-item-title>
                        <v-list-item-subtitle>
                          <span
                            >Browse a gallery of native plant species to find
                            the perfect plant for your garden.</span
                          >
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/sources">
                      <v-list-item-icon>
                        <v-icon>{{ mdiDatabase }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Open Data</v-list-item-title>
                        <v-list-item-subtitle>
                          <span
                            >All data and images used on this site are sourced
                            under creative commons licenses.</span
                          >
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-list-item to="/nurseries">
                      <v-list-item-icon>
                        <v-icon>{{ mdiStore }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Nurseries</v-list-item-title>
                        <v-list-item-subtitle>
                          <span
                            >Find your closest nursery and claim your free
                            plants now.</span
                          >
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      href="https://github.com/shadow81627/brisbane-city-council-free-native-plants"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ mdiOpenSourceInitiative }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Open Source</v-list-item-title>
                        <v-list-item-subtitle>
                          <span
                            >The code for this website is open source which
                            allows you to use, study, change, and share the
                            software in modified and unmodified form.</span
                          >
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { shuffle } from 'lodash-es'
import {
  mdiSprout,
  mdiStore,
  mdiDatabase,
  mdiOpenSourceInitiative,
} from '@mdi/js'
export default {
  data: () => ({
    items: [],
    mdiSprout,
    mdiStore,
    mdiDatabase,
    mdiOpenSourceInitiative,
  }),
  async fetch() {
    const content = await this.$content('species').fetch()
    const { body } = content
    const result = shuffle(
      body
        .filter((item) => item.image)
        .map((item) => ({
          name: item.species,
          image: item.image,
          credit: item.credit,
        }))
    )
    this.items = result
  },
  head() {
    return {
      title: 'About',
    }
  },
  methods: {
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
  },
}
</script>
