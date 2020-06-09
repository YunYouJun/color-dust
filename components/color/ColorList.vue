<template>
  <v-alert border="left" colored-border elevation="2">
    <h3 class="title">Clustered Colors By K-Means</h3>
    <v-divider class="mb-2"></v-divider>
    <v-row dense class="text-center justify-center">
      <v-col v-for="(color, i) in colors" :key="i" cols="3" md="1">
        <color-card :color="color"></color-card>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import ColorCard from '~/components/color/ColorCard'
export default {
  components: {
    ColorCard,
  },
  props: {
    colors: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
