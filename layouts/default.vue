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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <user-menu></user-menu> -->
    </v-app-bar>
    <v-main>
      <nuxt style="min-height: 100vh;" />
      <v-footer>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { mdiSprout, mdiInformation } from '@mdi/js'
// import UserMenu from '@/components/UserMenu.vue'
export default {
  components: {
    // UserMenu,
  },
  data() {
    return {
      drawer: false,
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
      ],
      title: 'Free Native Plants',
    }
  },
}
</script>
