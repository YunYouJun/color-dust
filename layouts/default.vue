<template>
  <v-app :style="{ backgroundColor: getBgColor }">
    <nav-drawer :color="getFgColor"></nav-drawer>
    <v-app-bar app clipped-left fixed :color="getFgColor" :elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$t('title')" />
      <v-spacer />
      <v-btn
        icon
        :to="
          $i18n.locale === 'en'
            ? '/zh' + $route.fullPath
            : $route.fullPath.replace(/^\/[^\/]+/, '')
        "
        exact
        nuxt
      >
        <v-icon>$vuetify.icons.mdiTranslate</v-icon>
      </v-btn>
      <v-btn icon @click.stop="$store.commit('theme/exchange')">
        <v-icon v-if="$store.state.theme.isExchanged"
          >$vuetify.icons.mdiToggleSwitch</v-icon
        >
        <v-icon v-else>$vuetify.icons.mdiToggleSwitchOff</v-icon>
      </v-btn>
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>$vuetify.icons.mdiInvertColors</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <base-footer></base-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import NavDrawer from '~/components/layouts/NavDrawer'
import BaseFooter from '~/components/layouts/BaseFooter'
export default {
  components: {
    NavDrawer,
    BaseFooter,
  },
  computed: {
    ...mapGetters('theme', ['getBgColor', 'getFgColor']),
    drawer: {
      get() {
        return this.$store.state.app.drawer
      },
      set(val) {
        this.$store.commit('app/setDrawer', val)
      },
    },
  },
  watch: {
    getFgColor(val) {
      document.documentElement.style.setProperty('--theme-color', val)
    },
  },
}
</script>

<style lang="scss">
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
  background-color: var(--theme-color, gray);
}
</style>
