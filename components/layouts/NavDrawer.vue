<template>
  <v-navigation-drawer v-model="drawer" clipped app mini-variant :color="color">
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="$i18n.path(item.to)"
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
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      items: [
        {
          icon: '$vuetify.icons.mdiHome',
          title: this.$t('links.home'),
          to: '',
        },
        {
          icon: '$vuetify.icons.mdiImageMultiple',
          title: this.$t('links.album'),
          to: 'album',
        },
        {
          icon: '$vuetify.icons.mdiTools',
          title: 'Tools',
          to: 'tools',
        },
        {
          icon: '$vuetify.icons.mdiInformation',
          title: this.$t('links.about'),
          to: 'about',
        },
      ],
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.app.drawer
      },
      set(val) {
        this.$store.commit('app/setDrawer', val)
      },
    },
  },
}
</script>
