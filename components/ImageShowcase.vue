<template>
  <div>
    <v-card
      class="showcase-wrap"
      :class="{ censused: bgColor }"
      :style="{ backgroundColor: bgColor }"
      :elevation="0"
    >
      <canvas ref="canvasShowcase" class="showcase"></canvas>
    </v-card>
    <v-alert border="left" class="mt-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-file-input
            v-model="file"
            accept="image/*"
            placeholder="Upload image to parse."
            prepend-icon="$vuetify.icons.mdiImage"
            small-chips
            show-size
            outlined
            dense
            hide-details
            @change="startProcess"
            @click:clear="handleClearClick"
          ></v-file-input>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field
            v-model="blur"
            label="Blur"
            type="number"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2">
          <v-checkbox v-model="palette" dense label="Palette"></v-checkbox>
        </v-col>
        <v-col cols="12" md="10">
          <v-slider
            v-model="K"
            class="mt-5"
            min="3"
            max="20"
            thumb-label="always"
            prepend-icon="$vuetify.icons.mdiPalette"
            dense
            hint="How many colors?"
            @end="censusImage"
          ></v-slider>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import ColorDust from '~/packages/color-dust'
import { isDark } from '~/packages/color-dust/utils'
export default {
  data() {
    return {
      palette: true,
      colorDust: {},
      // bgColor: '',
      file: null,
      K: 6,
      message: '',
      blur: 0,
    }
  },
  computed: {
    bgColor() {
      return this.$store.state.theme.primaryColor
    },
  },
  mounted() {
    const canvas = this.$refs.canvasShowcase
    this.colorDust = new ColorDust(canvas)
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
        this.$toast.info(this.message)
      }
      const colorsInfo = this.colorDust.colorsInfo
      const mainColor = this.colorDust.mainColor
      // const mainColorRGB =
      //   colorsInfo[0].r + ',' + colorsInfo[0].g + ',' + colorsInfo[0].b
      // const primaryColor = 'rgba(' + mainColorRGB + ',0.8)'
      const primaryColor = this.colorDust.averageColor
      const accentColor = mainColor[0]
      this.$vuetify.theme.dark = isDark(accentColor)

      this.$store.commit('setColorsInfo', colorsInfo)
      this.$store.commit('setClusterColors', this.colorDust.clusterColors)
      this.$store.commit('setMainColor', mainColor)
      this.$store.commit('setAverageColor', this.colorDust.averageColor)
      this.$store.commit('setProcessInfo', this.colorDust.processInfo)
      // theme
      this.$store.commit('theme/setPrimaryColor', primaryColor)
      this.$store.commit('theme/setAccentColor', accentColor)
      // draw
      this.colorDust.drawPalette()
    },
  },
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
