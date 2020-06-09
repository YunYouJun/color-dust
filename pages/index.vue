<template>
  <v-row no-gutters>
    <v-col cols="12">
      <image-showcase></image-showcase>
    </v-col>
    <v-col cols="12">
      <color-list :colors="$store.state.clusterColors"></color-list>
    </v-col>
    <v-col cols="12">
      <color-bar
        label="main color"
        :colors="this.$store.state.mainColor"
      ></color-bar>
    </v-col>
    <v-col cols="12">
      <color-bar
        label="average color"
        :colors="[this.$store.state.averageColor]"
      ></color-bar>
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
// components
import ImageShowcase from '~/components/ImageShowcase'
import ColorBar from '~/components/ColorBar'
import ImageInfo from '~/components/ImageInfo'
import ColorList from '~/components/color/ColorList'
import CanvasBubbleChart from '~/components/CanvasBubbleChart'
export default {
  components: {
    ImageShowcase,
    ColorBar,
    ColorList,
    ImageInfo,
    CanvasBubbleChart,
  },
  head() {
    return {
      title: 'Welcome',
    }
  },
}
</script>
