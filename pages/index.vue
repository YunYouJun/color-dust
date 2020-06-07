<template>
  <v-row no-gutters>
    <v-col cols="12">
      <image-showcase></image-showcase>
    </v-col>
    <v-col cols="12">
      <color-card :colors="$store.state.clusterColors"></color-card>
    </v-col>
    <v-col cols="12">
      <color-bar label="main color" v-bind="mcProps"></color-bar>
    </v-col>
    <v-col cols="12">
      <color-bar label="average color" v-bind="acProps"></color-bar>
    </v-col>
    <v-col cols="12">
      <image-info></image-info>
    </v-col>
    <v-col cols="12">
      <canvas-bubble-chart
        :colors="$store.state.colorsInfo"
      ></canvas-bubble-chart>
    </v-col>
  </v-row>
</template>

<script>
import { hslToRgb, rgbToHex } from '~/packages/color-dust/utils'
// components
import ImageShowcase from '~/components/ImageShowcase'
import ColorBar from '~/components/ColorBar'
import ImageInfo from '~/components/ImageInfo'
import ColorCard from '~/components/ColorCard'
import CanvasBubbleChart from '~/components/CanvasBubbleChart'
export default {
  components: {
    ImageShowcase,
    ColorBar,
    ImageInfo,
    ColorCard,
    CanvasBubbleChart,
  },
  computed: {
    mcProps() {
      return this.colorToProps(this.$store.state.mainColor)
    },
    acProps() {
      return this.colorToProps(this.$store.state.averageColor)
    },
  },
  methods: {
    colorToProps(color) {
      if (!color || color.length === 0) {
        return {}
      }
      let _props = {}
      let cStart = ''
      let cMiddle = ''
      let cEnd = ''
      if (color.length === 3) {
        cStart = rgbToHex(hslToRgb(color[0].h, color[0].s, color[0].l))
        cMiddle = rgbToHex(hslToRgb(color[1].h, color[1].s, color[1].l))
        cEnd = rgbToHex(hslToRgb(color[2].h, color[2].s, color[2].l))
      } else {
        cMiddle = rgbToHex(hslToRgb(color.h, color.s, color.l))
        cStart = rgbToHex(
          hslToRgb(
            color.h - 30 < 0 ? 0 : color.h - 30,
            color.s - 20 < 0 ? 0 : color.s - 20,
            color.l + 20 > 100 ? 100 : color.l + 20
          )
        )
        cEnd = rgbToHex(
          hslToRgb(
            color.h + 30 > 360 ? 360 : color.h + 30,
            color.s + 20 > 100 ? 100 : color.s + 20,
            color.l - 20 < 0 ? 0 : color.l - 20
          )
        )
      }
      _props = {
        colorStart: cStart,
        colorMiddle: cMiddle,
        colorEnd: cEnd,
      }
      return _props
    },
  },
  head() {
    return {
      title: 'Welcome',
    }
  },
}
</script>
