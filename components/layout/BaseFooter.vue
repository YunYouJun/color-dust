<template>
  <v-footer padless>
    <v-card flat tile class="text-center" width="100%">
      <v-card-text>
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          icon
          :href="item.href"
          target="_blank"
          :color="item.color"
          ><v-icon>{{ item.icon }}</v-icon></v-btn
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        href: 'https://github.com/YunYouJun/color-dust',
        icon: '$vuetify.icons.mdiGithub',
        color: 'black',
      },
      {
        href: 'https://github.com/YunYouJun',
        icon: '$vuetify.icons.mdiCloud',
        color: 'blue',
      },
      {
        href: 'https://www.yunyoujun.cn',
        icon: '$vuetify.icons.mdiEarth',
        color: 'purple',
      },
    ],
  }),
}
</script>
