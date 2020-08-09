<template>
  <v-app clipped-left>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      fixed
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-app-bar-nav-icon aria-label="menu" @click.stop="drawer = !drawer">
        <v-progress-circular
          v-if="loading"
          indeterminate
          size="18"
          width="2"
        ></v-progress-circular>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <user-menu></user-menu> -->
    </v-app-bar>
    <v-main>
      <nuxt style="min-height: 100vh;" />
      <v-footer>
        <v-container>
          <v-row no-gutters>
            <v-col cols="auto">
              <v-card flat color="transparent">
                <v-card-text>
                  <span>{{ $config.VERSION }}</span>
                  <span v-if="($config.COMMIT || $config.TRAVIS_COMMIT)">{{
                    shortHash($config.COMMIT || $config.TRAVIS_COMMIT)
                  }}</span>
                  <span
                    v-if="
                      $config.VERSION &&
                      ($config.COMMIT || $config.TRAVIS_COMMIT)
                    "
                    >|</span
                  >
                  <nuxt-link to="/releases">
                    <span>Changelog</span>
                  </nuxt-link>
                </v-card-text>
              </v-card>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-card flat color="transparent">
                <v-card-text>
                  <span
                    >This site is protected by reCAPTCHA and the Google</span
                  >
                  <a href="https://policies.google.com/privacy"
                    >Privacy Policy</a
                  >
                  <span>and</span>
                  <a href="https://policies.google.com/terms"
                    >Terms of Service</a
                  >
                  <span>apply.</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto">
              <v-card flat tile color="transparent">
                <v-card-text class="py-2 text-left">
                  <div>
                    <!-- <nuxt-link to="/">About</nuxt-link> -->
                    <!-- <span> |</span>
                    <nuxt-link to="/contact">Contact</nuxt-link> |
                    <nuxt-link to="/newsletter">Newsletter</nuxt-link> -->
                  </div>
                  <span>Made with </span>
                  <span>🌱</span>
                  <span> in Brisbane, Australia</span>
                  <br />
                  <span
                    >© 2020 |
                    <a href="https://daim.dev">Damien Robinson</a></span
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <v-spacer />
            <v-col v-if="$config.DATE_GENERATED" cols="auto">
              <v-card flat tile color="transparent">
                <v-card-text v-intersect="onIntersect"
                  >Last modified
                  <v-tooltip top>
                    <span>{{ lastModified.toString() }}</span>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{
                        lastModified.toRelative()
                      }}</span>
                    </template>
                  </v-tooltip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { DateTime } from 'luxon'
import { mdiSprout, mdiInformation, mdiStore } from '@mdi/js'
// import UserMenu from '@/components/UserMenu.vue'
export default {
  components: {
    // UserMenu,
  },
  data() {
    return {
      drawer: false,
      loading: true,
      items: [
        {
          icon: mdiInformation,
          title: 'About',
          to: '/',
        },
        {
          icon: mdiSprout,
          title: 'Species',
          to: '/species',
        },
        {
          icon: mdiStore,
          title: 'Nurseries',
          to: '/nurseries',
        },
      ],
      title: 'Free Native Plants',
      lastModified: DateTime.fromISO(this.$config.DATE_GENERATED),
    }
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      this.loading = false
    }
  },
  methods: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
    onIntersect() {
      this.lastModified = DateTime.fromISO(this.$config.DATE_GENERATED)
    },
  },
}
</script>
