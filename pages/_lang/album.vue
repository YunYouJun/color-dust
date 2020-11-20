<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col v-for="n in 8" :key="n" cols="6" md="3">
          <v-card class="d-flex" @click="handleCardClick">
            <v-img
              :src="`https://picsum.photos/id/${n}00/200/200.jpg`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-alert border="left" colored-border elevation="2">
            <p class="ml-2 my-0 headline font-weight-light">
              {{ $t('album.tooltip') }}
            </p>
            <canvas ref="albumDemo" class="album-canvas"></canvas>
          </v-alert>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ColorDust from '~/packages/color-dust'
export default {
  head() {
    return {
      title: this.$t('links.album'),
    }
  },
  mounted() {
    this.colorDust = new ColorDust(this.$refs.albumDemo)
  },
  methods: {
    async handleCardClick(e) {
      const img = e.target.previousElementSibling.style.backgroundImage
      if (!img) return
      const url = img.slice(5, -2)
      await this.colorDust.readFile(url)
      const mainColor = this.colorDust.mainColor
      const primaryColor = this.colorDust.averageColor

      const accentColor = mainColor[0]
      this.$vuetify.theme.dark = accentColor.isDark()

      this.$store.commit('theme/setPrimaryColor', primaryColor)
      this.$store.commit('theme/setAccentColor', accentColor)
    },
  },
}
</script>

<style>
.album-canvas {
  position: fixed;
  opacity: 0;
  z-index: -1;
  width: 300;
  height: 300;
}
</style>
