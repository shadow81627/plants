<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Sources</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>somthing </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        name: 'Free Native Plants',
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
        name: 'Waterwise plants data',
        link:
          'https://www.data.qld.gov.au/dataset/waterwise-plants/resource/fd297d03-bf72-40c7-b27e-24cc7023360c',
      },
    ],
  }),
}
</script>
