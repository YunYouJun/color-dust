<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col v-for="n in 8" :key="n" cols="6" md="3">
          <v-card class="d-flex" @click="handleCardClick">
            <v-img
              :src="`https://i.picsum.photos/id/${n}00/200/200.jpg`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
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
              You can click the card to switch to a theme similar to the
              picture. <br />Just need some time to load image.
            </p>
            <canvas ref="albumDemo" class="album-canvas"></canvas>
          </v-alert>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style>
.album-canvas {
  position: fixed;
  opacity: 0;
  z-index: -1;
  width: 300;
  height: 300;
}
</style>

<script>
// :src="`https://picsum.photos/200?random=${n}`"
import ColorDust from '~/packages/color-dust'
export default {
  mounted() {
    this.colorDust = new ColorDust(this.$refs.albumDemo)
  },
  methods: {
    async handleCardClick(e) {
      const img = e.target.previousElementSibling.style.backgroundImage
      if (!img) return
      const url = img.slice(5, -2)
      await this.colorDust.readFile(url)
      const colorsInfo = this.colorDust.colorsInfo
      const mainColor = this.colorDust.mainColor
      const mainColorRGB =
        colorsInfo[0].r + ',' + colorsInfo[0].g + ',' + colorsInfo[0].b
      const primaryColor = 'rgba(' + mainColorRGB + ',0.8)'
      const accentColor =
        'rgba(' +
        mainColor[2].r +
        ',' +
        mainColor[2].g +
        ',' +
        mainColor[2].b +
        ',1)'
      this.$store.commit('theme/setPrimaryColor', primaryColor)
      this.$store.commit('theme/setAccentColor', accentColor)
    },
  },
  head() {
    return {
      title: 'Image Test',
    }
  },
}
</script>
