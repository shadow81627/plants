<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Waterwise</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>{{ list }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch() {
    const result = await this.$content('waterwise-plants').fetch()
    const { body } = result
    this.list = body ?? []
  },
  fetchOnServer: false,
  data: () => ({
    list: [],
  }),
}
</script>
