<template>
  <div>
    <v-card
      class="showcase-wrap"
      :class="{ censused: bgColor }"
      :style="{ backgroundColor: bgColor }"
    >
      <canvas ref="canvasShowcase" class="showcase"></canvas>
    </v-card>
    <v-alert border="left" class="mt-4">
      <v-slider
        v-model="K"
        class="mt-5"
        min="3"
        max="20"
        thumb-label="always"
        prepend-icon="color_lens"
        dense
        hint="How many colors?"
        @end="censusImage"
      ></v-slider>
      <v-file-input
        v-model="file"
        accept="image/*"
        placeholder="Upload image to parse."
        prepend-icon="photo"
        small-chips
        show-size
        outlined
        dense
        hide-details
        @change="startProcess"
        @click:clear="handleClearClick"
      ></v-file-input>
    </v-alert>
    <v-snackbar v-model="snackbar">
      {{ message }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import ColorDust from '~/packages/color-dust'
import { hslToRgb } from '~/packages/color-dust/utils'
export default {
  data() {
    return {
      colorDust: {},
      bgColor: '',
      file: null,
      K: 6,
      snackbar: false,
      message: ''
    }
  },
  mounted() {
    const canvas = this.$refs.canvasShowcase
    this.colorDust = new ColorDust(canvas)
    this.ctx = canvas.getContext('2d')
    this.pixelRatio = window.devicePixelRatio || 1
    canvas.width = this.pixelRatio * parseInt(getComputedStyle(canvas).width)
    canvas.height = this.pixelRatio * parseInt(getComputedStyle(canvas).height)
    this.oriWidth = canvas.width
    this.oriHeight = canvas.height
  },
  methods: {
    censusImage() {
      if (this.file) {
        this.colorDust.K = this.K
        this.colorDust.censusImage()
        this.colorDust.drawPalette()
      }
    },
    handleClearClick() {
      this.colorDust.clearCanvas()
      this.$store.dispatch('resetApp')
    },
    async startProcess() {
      if (!this.file) return
      this.message = await this.colorDust.readFile(this.file)
      if (this.message) {
        this.snackbar = true
      }
      const colorsInfo = this.colorDust.colorsInfo
      const mainColor = this.colorDust.mainColor
      const mainColorRGB =
        colorsInfo[0].r + ',' + colorsInfo[0].g + ',' + colorsInfo[0].b
      this.bgColor = 'rgba(' + mainColorRGB + ',0.3)'
      const primaryColor = 'rgba(' + mainColorRGB + ',0.8)'
      const accentColor =
        'rgba(' +
        mainColor[2].r +
        ',' +
        mainColor[2].g +
        ',' +
        mainColor[2].b +
        ',0.8)'
      this.$store.commit('setColorsInfo', colorsInfo)
      this.$store.commit('setClusterColors', this.colorDust.clusterColors)
      this.$store.commit('setMainColor', mainColor)
      this.$store.commit('setAverageColor', this.colorDust.averageColor)
      this.$store.commit('setProcessInfo', this.colorDust.processInfo)
      this.updateLoopColors(
        this.colorDust.mainColor,
        this.colorDust.clusterRes[0]
      )
      // theme
      this.$store.commit('theme/setPrimaryColor', primaryColor)
      this.$store.commit('theme/setAccentColor', accentColor)
      // draw
      this.colorDust.drawPalette()
    },
    updateLoopColors(mainColor, clusterRes) {
      const scale = 1.1
      const mcR =
        mainColor[0].r * scale < 255 ? Math.floor(mainColor[0].r * scale) : 255
      const mcG =
        mainColor[0].g * scale < 255 ? Math.floor(mainColor[0].g * scale) : 255
      const mcB =
        mainColor[0].b * scale < 255 ? Math.floor(mainColor[0].b * scale) : 255
      const mcR2 =
        mcR * scale * scale < 255 ? Math.floor(mcR * scale * scale) : 255
      const mcG2 =
        mcG * scale * scale < 255 ? Math.floor(mcG * scale * scale) : 255
      const mcB2 =
        mcB * scale * scale < 255 ? Math.floor(mcB * scale * scale) : 255
      const step = Math.floor(clusterRes.length / 3)
      const bc1 = hslToRgb(clusterRes[0].h, clusterRes[0].s, clusterRes[0].l)
      const bc2 = hslToRgb(
        clusterRes[step].h,
        clusterRes[step].s,
        clusterRes[step].l
      )
      const bc3 = hslToRgb(
        clusterRes[step * 2].h,
        clusterRes[step * 2].s,
        clusterRes[step * 2].l
      )
      const loopColors = [
        [
          'rgb(' + mcR + ',' + mcG + ',' + mcB + ')',
          'rgb(' + mcR2 + ',' + mcG2 + ',' + mcB2 + ')'
        ],
        [
          'rgba(' + bc1[0] + ',' + bc1[1] + ',' + bc1[2] + ',0.4)',
          'rgba(' + bc1[0] + ',' + bc1[1] + ',' + bc1[2] + ',0.7)'
        ],
        [
          'rgba(' + bc2[0] + ',' + bc2[1] + ',' + bc2[2] + ',0.4)',
          'rgba(' + bc2[0] + ',' + bc2[1] + ',' + bc2[2] + ',0.7)'
        ],
        [
          'rgba(' + bc3[0] + ',' + bc3[1] + ',' + bc3[2] + ',0.4)',
          'rgba(' + bc3[0] + ',' + bc3[1] + ',' + bc3[2] + ',0.7)'
        ]
      ]
      this.$store.commit('setLoopColors', loopColors)
    }
  }
}
</script>

<style lang="scss">
.showcase {
  width: 100%;
  max-width: 1024px;
  height: 460px;
  background-color: transparent;

  &-wrap {
    position: relative;
    overflow: hidden;
    z-index: 0;
    text-align: center;
    line-height: 0;

    &.censused {
      z-index: 0;

      &::after {
        display: none;
        animation: none;
      }
    }

    &::after {
      position: absolute;
      top: -100%;
      right: -100%;
      bottom: -100%;
      left: -100%;
      background: -webkit-linear-gradient(45deg, #fcc, #cfc, #ccf);
      background-position: 0 0;
      background-size: 100% 100%;
      content: '';
      transform: translate(30%, 30%);
      animation: bg 8s infinite linear alternate;
      will-change: transform;
      z-index: -1;
    }
  }
}

@keyframes bg {
  33% {
    transform: translate(-30%, 30%);
  }
  66% {
    transform: translate(-30%, -30%);
  }
  100% {
    transform: translate(30%, -30%);
  }
}
</style>
