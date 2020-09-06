<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Brisbane City Council’s Free Native Plants program</h1>
        <p>
          Brisbane City Council’s Free Native Plants Program offers a range of
          plants to assist the community to plant and green their properties.
          Council offers the Free Native Plants Program to residential
          ratepayers, schools, clubs, body corporates and registered community
          groups within the Brisbane Local Government area to plant on their
          properties. The native species provided through the program are
          designed to help grow our city's urban forest and support local
          wildlife. Further information is available on the
          <a
            rel="noreferrer"
            href="https://www.brisbane.qld.gov.au/clean-and-green/green-home-and-community/sustainable-gardening/free-native-plants-program"
            >Brisbane City Council website</a
          >.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
            :src-set="src(`./${item.image}`).srcSet"
            :style="{
              backgroundColor: backgroundColor(`./${item.image}`)[0],
            }"
            sizes="(max-width: 1785px) 100vw, 1785px"
            height="500"
            :to="`/species/${item.name}`"
          >
            <v-container class="fill-height align-items-end justify-start pb-0">
              <v-row class="align-self-end pb-0" align="end" justify="start">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { shuffle } from 'lodash-es'
export default {
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
  data: () => ({
    items: [],
  }),
  methods: {
    backgroundColor: require.context(
      '~/assets/img/species?lqip-colors',
      false,
      /\.(png|jpe?g|svg).*$/
    ),
    src: require.context(
      `~/assets/img/species?resize&sizes[]=320&sizes[]=600&sizes[]=900&sizes[]=1785&sizes[]=4686&format=webp`,
      false,
      /\.(png|jpe?g|svg).*$/
    ),
  },
}
</script>
