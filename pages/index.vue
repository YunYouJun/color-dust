<template>
  <v-row no-gutters="">
    <v-col cols="12">
      <image-showcase></image-showcase>
    </v-col>
    <v-col cols="12">
      <score-layer :score="score"></score-layer>
    </v-col>
    <v-col cols="12">
      <color-bar label="main color"></color-bar>
    </v-col>
    <v-col cols="12" class="mt-2">
      <color-bar label="average color"></color-bar>
    </v-col>
    <v-col cols="12">
      <image-info></image-info>
    </v-col>
  </v-row>
</template>

<script>
import ImageShowcase from '~/components/ImageShowcase'
import ScoreLayer from '~/components/ScoreLayer'
import ColorBar from '~/components/ColorBar'
import ImageInfo from '~/components/ImageInfo'
export default {
  components: {
    ImageShowcase,
    ScoreLayer,
    ColorBar,
    ImageInfo
  },
  data() {
    return {
      clusterColors: [],
      score: ''
    }
  }
}
</script>
