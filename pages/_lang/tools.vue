<template>
  <div class="text-center">
    <v-row>
      <v-col cols="6">
        <v-card class="img-canvas-container">
          <canvas ref="originCanvas" class="img-canvas" height="480"></canvas>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="img-canvas-container">
          <canvas ref="blurCanvas" class="img-canvas" height="480"></canvas>
        </v-card>
      </v-col>
    </v-row>
    <v-alert border="left" class="mt-4">
      <v-file-input
        v-model="file"
        accept="image/*"
        placeholder="Upload image to blur."
        prepend-icon="$vuetify.icons.mdiImage"
        small-chips
        show-size
        outlined
        dense
        hide-details
        @change="handleFileChange"
        @click:clear="handleClearClick"
      ></v-file-input>
    </v-alert>
  </div>
</template>

<script>
import { readImage, drawToCanvas, clearCanvas } from '~/assets/utils/index'
export default {
  data() {
    return {
      pixelRatio: window.devicePixelRatio || 1,
      file: null,
      url: '/color-dust/icon.png',
    }
  },
  mounted() {
    this.handleFileChange()
  },
  methods: {
    async handleFileChange() {
      const uri = this.file || this.url
      const image = await readImage(uri)

      drawToCanvas(image, this.$refs.originCanvas)
      drawToCanvas(image, this.$refs.blurCanvas, {
        blur: '20px',
      })
    },
    handleClearClick() {
      clearCanvas(this.$refs.originCanvas)
      clearCanvas(this.$refs.blurCanvas)
      this.$store.dispatch('resetApp')
    },
  },
}
</script>

<style lang="scss">
.img-canvas {
  &-container {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
