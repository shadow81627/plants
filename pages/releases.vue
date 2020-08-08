<template>
  <v-container>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <v-sheet class="markdown-body" v-html="content" />
  </v-container>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import content from '@/CHANGELOG.md'
export default {
  computed: {
    content() {
      return content
    },
  },
  head() {
    return {
      title: 'Releases',
    }
  },
}
</script>
