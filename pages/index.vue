<template>
  <v-row no-gutters>
    <v-col cols="12">
      <image-showcase></image-showcase>
    </v-col>
    <v-col cols="12">
      <score-layer></score-layer>
    </v-col>
    <v-col cols="12">
      <color-bar label="main color" v-bind="mcProps"></color-bar>
    </v-col>
    <v-col cols="12" class="mt-2">
      <color-bar label="average color" v-bind="acProps"></color-bar>
    </v-col>
    <v-col cols="12">
      <color-card :colors="$store.state.clusterColors"></color-card>
    </v-col>
    <v-col cols="12" class="mt-5">
      <image-info></image-info>
    </v-col>
  </v-row>
</template>

<script>
// utils
import brain from 'brain'
import { network1, network2 } from '~/assets/js/trainData.js'
import { hslToRgb, rgbToHex } from '~/assets/js/utils.js'
// components
import ImageShowcase from '~/components/ImageShowcase'
import ScoreLayer from '~/components/ScoreLayer'
import ColorBar from '~/components/ColorBar'
import ImageInfo from '~/components/ImageInfo'
import ColorCard from '~/components/ColorCard'
export default {
  components: {
    ImageShowcase,
    ScoreLayer,
    ColorBar,
    ImageInfo,
    ColorCard
  },
  computed: {
    mcProps() {
      return this.colorToProps(this.$store.state.mainColor)
    },
    acProps() {
      return this.colorToProps(this.$store.state.averageColor)
    }
  },
  mounted() {
    this.net = new brain.NeuralNetwork()
    this.net2 = new brain.NeuralNetwork()
    this.net.fromJSON(network1)
    this.net2.fromJSON(network2)
    this.$store.commit('setNetwork', this.net)
    this.$store.commit('setNetwork2', this.net2)
  },
  methods: {
    colorToProps(color) {
      if (!color) {
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
        colorEnd: cEnd
      }
      return _props
    }
  }
}
</script>
