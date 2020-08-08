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
        <v-sheet color="secondary">
          <v-carousel cycle hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :lazy-src="
                require(`@/assets/img/species/${item.src}?resize&size=1785&placeholder&lqip`)
                  .src
              "
              :src="
                require(`@/assets/img/species/${item.src}?resize&size=1785&placeholder`)
                  .src
              "
              :src-set="
                require(`@/assets/img/species/${item.src}?resize&max=1785&min=320&steps=6`)
                  .srcSet
              "
              reverse-transition="fade-transition"
              transition="fade-transition"
              to="/species"
            >
              <v-container
                class="fill-height align-items-end justify-start pb-0"
              >
                <v-row class="align-self-end pb-0" align="end" justify="start">
                  <v-col class="pa-0">
                    <v-card style="background: rgba(0, 0, 0, 0.3);">
                      <v-card-text class="pb-0">
                        {{ item.name }}
                      </v-card-text>
                      <v-card-text class="caption text-no-wrap">
                        {{ item.credit }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
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
        .filter((item) => item.Image)
        .map((item) => ({
          name: item.species,
          src: item.image,
          credit: item.credit,
        }))
    )
    this.items = result
  },
  data: () => ({
    items: [],
  }),
}
</script>
