<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Brisbane City Council’s Free Native Plants program</h1>
        <p>
          Brisbane City Council’s Free Native Plants Program offers a range of
          plants to assist the community to plant and green their properties.
          The native species provided through the program will help grow our
          city’s urban forest and support local wildlife.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet dark>
          <v-carousel cycle hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              dark
              :src="require(`@/assets/img/species/${item.src}`)"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch() {
    const result = await this.$content('species').fetch()
    const { body } = result
    this.items = body
      .filter((item) => item.Image)
      .map((item) => ({ src: item.Image }))
  },
  data: () => ({
    items: [],
  }),
}
</script>
