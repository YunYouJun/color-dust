<template>
  <v-card
    ripple
    hover
    :color="colorHex"
    class="color-card"
    @click="copyColorHex"
  >
    <h4
      class="pa-0 color-text text-uppercase subtitle-2"
      style="font-family: Source Code Pro !important"
    >
      {{ colorHex }}
    </h4>
  </v-card>
</template>

<script>
import { TinyColor } from '@ctrl/tinycolor'
export default {
  props: {
    color: {
      type: Object,
      default() {
        return new TinyColor()
      },
    },
  },
  computed: {
    colorHex() {
      return this.color.toHexString().toUpperCase()
    },
  },
  methods: {
    copyColorHex() {
      const curColor = this.colorHex
      navigator.clipboard.writeText(curColor)
      this.$toast.success(
        `Copy 「<strong style="color:${curColor}">${curColor}</strong>」 successfully!`
      )
    },
  },
}
</script>

<style>
.color-card {
  min-height: 100px;
}
.color-text {
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  color: black;
}
</style>
