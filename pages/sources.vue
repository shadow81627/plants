<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Sources</h1>
        <p>See below sources for data sets used to produce this site.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        xsm="6"
        md="6"
        lg="4"
        class="d-flex flex-column"
      >
        <v-card class="flex d-flex flex-column justify-between">
          <v-card
            class="flex d-flex flex-column justify-between"
            append
            :href="item.link"
            target="_blank"
            rel="noopener"
            flat
          >
            <div class="flex-grow-1">
              <v-card-title class="text-break text-wrap">
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.author }}
              </v-card-subtitle>
              <v-card-text>
                {{ item.description }}
              </v-card-text>
            </div>
          </v-card>
          <v-card-actions>
            <v-btn
              :href="item.license.link"
              target="_blank"
              rel="noopener"
              text
              block
              >{{ item.license.text }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        name: 'Free Native Plants',
        author: 'Brisbane City Council',
        description:
          "This dataset contains information about Brisbane City Council's Free Native Plants Program. Council offers the Free Native Plants Program to residential ratepayers, schools, clubs, body corporates and registered community groups within the Brisbane Local Government area to plant on their properties. The native species provided through the program are designed to help grow our city's urban forest and support local wildlife.",
        link:
          'https://www.data.brisbane.qld.gov.au/data/dataset/free-native-plants',
        license: {
          text: 'Creative Commons Attribution 4.0',
          link: 'https://creativecommons.org/licenses/by/4.0/',
        },
      },
      {
        name: 'Waterwise plants',
        author: 'Queensland Government',
        description:
          'Waterwise plant information. Includes information like botanical names; water, climate, soil and light needs; level of maintenance required etc.',
        link: 'https://www.data.qld.gov.au/dataset/waterwise-plants',
        license: {
          text: 'Creative Commons Attribution 3.0',
          link: 'https://creativecommons.org/licenses/by/3.0/',
        },
      },
      {
        name: 'Images',
        author: 'Creative Commons Search',
        description:
          'A new Creative Commons search tool for creators seeking to discover and reuse free resources with greater ease.',
        link: 'https://ccsearch.creativecommons.org/',
        license: {
          text: 'Creative Commons Attribution 2.0',
          link: 'https://creativecommons.org/licenses/by/2.0/',
        },
      },
    ],
  }),
  head() {
    return {
      title: 'Sources',
    }
  },
}
</script>
