<template>
  <div>
    <v-menu v-model="menu" offset-y>
      <template #activator="{ on }">
        <v-btn
          icon
          large
          aria-label="user menu"
          width="32"
          height="32"
          v-on="on"
        >
          <v-avatar size="32px" tile width="32" min-width="32">
            <v-icon>{{ mdiAccountCircle }}</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list flat dense>
          <v-list-item @click="currentTheme = !currentTheme">
            <v-list-item-icon>
              <v-icon>{{ mdiThemeLightDark }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                currentTheme ? 'Light Mode' : 'Dark Mode'
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import {
  mdiAccountCircle,
  mdiLogout,
  mdiThemeLightDark,
  mdiAccountGroup,
} from '@mdi/js'
export default {
  data: () => ({
    menu: false,
    mdiAccountCircle,
    mdiLogout,
    mdiThemeLightDark,
    mdiAccountGroup,
  }),
  computed: {
    currentTheme: {
      get() {
        return this.$warehouse.get('dark')
      },
      set(value) {
        this.$warehouse.set('dark', value)
        this.$vuetify.theme.dark = value
      },
    },
  },
}
</script>
