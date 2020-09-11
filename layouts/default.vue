<template>
  <v-app clipped-left>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      class="hidden-print-only"
      disable-resize-watcher
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
      <v-container fluid class="d-flex pa-0 align-center">
        <nuxt-link to="/" class="d-flex align-center text-decoration-none">
          <img
            :src="`${$icon(24)}`"
            :srcset="`${$icon(24)} 1x, ${$icon(48)} 2x`"
            width="24"
            height="24"
            onerror="javascript:this.style.display = 'none'"
          />
          <v-toolbar-title class="ml-1 d-none d-sm-flex text--primary">
            {{ $config.APP_NAME }}</v-toolbar-title
          >
        </nuxt-link>
      </v-container>

      <v-spacer />
      <!-- <user-menu></user-menu> -->
    </v-app-bar>
    <v-main>
      <nuxt style="min-height: 100vh" />
      <v-footer>
        <v-container>
          <v-row no-gutters>
            <v-col cols="auto">
              <v-card flat color="transparent">
                <v-card-text>
                  <span>{{ $config.VERSION }}</span>
                  <span v-if="$config.COMMIT || $config.TRAVIS_COMMIT">{{
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
                <v-card-text class="pb-0">
                  <span>Made with </span>
                  <span>🌱</span>
                  <span> in Brisbane, Australia</span>
                  <br />
                </v-card-text>
                <v-card-text class="pt-0"
                  >© 2020 |
                  <a href="https://daim.dev">Damien Robinson</a></v-card-text
                >
              </v-card>
            </v-col>
            <v-spacer />
            <v-col v-if="$config.DATE_GENERATED" cols="auto">
              <last-modified />
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { mdiSprout, mdiInformation, mdiStore, mdiDatabase } from '@mdi/js'
// import UserMenu from '@/components/UserMenu.vue'
import LastModified from '@/components/LastModified'
export default {
  components: {
    // UserMenu,
    LastModified,
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
        {
          icon: mdiDatabase,
          title: 'Sources',
          to: '/sources',
        },
      ],
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
  },
}
</script>
