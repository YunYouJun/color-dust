<template>
  <v-app :style="{ backgroundColor: getBgColor, '--theme-color': getBgColor }">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      mini-variant
      :color="getFgColor"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action :title="item.title">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left fixed :color="getFgColor">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="$store.commit('theme/exchange')">
        <v-icon>transform</v-icon>
      </v-btn>
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>invert_colors</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'home',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'photo_library',
          title: 'Album',
          to: '/album',
        },
        {
          icon: 'info',
          title: 'About',
          to: '/about',
        },
      ],
      title: 'Color Dust',
    }
  },
  computed: {
    ...mapGetters('theme', ['getBgColor', 'getFgColor']),
  },
}
</script>

<style lang="scss">
:root {
  --theme-color: #333;
}

::-webkit-scrollbar {
  width: 0.8rem;
  background-color: transparent;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: var(--theme-color);
}
</style>
