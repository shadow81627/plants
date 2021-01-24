<template>
  <client-only>
    <v-card v-if="lastModified" flat tile color="transparent">
      <v-card-text class="pb-0">Last Modified</v-card-text>
      <v-card-text class="pt-0">
        <v-tooltip top>
          <span>{{ relativeDate }}</span>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{
              lastModified.format('MMM D, YYYY h:mm A')
            }}</span>
          </template>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </client-only>
</template>

<script>
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  props: {
    utc: Boolean,
    interval: { type: Number, default: 60000 },
  },
  data() {
    return {
      relativeDate: null,
      timer: null,
    }
  },
  computed: {
    lastModified() {
      return dayjs(this.$config.DATE_GENERATED)
    },
  },
  created() {
    this.toRelativeDate()
    this.timer = setInterval(this.toRelativeDate, this.interval)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    toRelativeDate() {
      this.relativeDate = this.lastModified.fromNow()
    },
  },
}
</script>
