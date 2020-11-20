<template>
  <div>
    <v-card :loading="loading" class="showcase-wrap">
      <canvas ref="canvasShowcase" class="showcase censused"></canvas>
    </v-card>
    <v-alert
      color="primary"
      colored-border
      border="left"
      class="mt-4"
      elevation="2"
    >
      <chart-control></chart-control>
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="url"
            :label="$t('home.url.label')"
            prepend-icon="$vuetify.icons.mdiLink"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="text-center">
          <v-btn fab color="blue-grey" dark @click="startProcess('url')">
            <v-icon>$vuetify.icons.mdiEyedropper</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
            v-model="file"
            accept="image/*"
            :placeholder="$t('home.upload.placeholder')"
            prepend-icon="$vuetify.icons.mdiImage"
            small-chips
            show-size
            outlined
            dense
            hide-details
            @change="startProcess('file')"
            @click:clear="handleClearClick"
          ></v-file-input>
        </v-col>
        <v-col cols="6" md="4">
          <v-text-field
            v-model="blur"
            :label="$t('home.blur.label')"
            type="number"
            outlined
            dense
            min="0"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-slider
            v-model="K"
            class="mt-5"
            min="0"
            max="20"
            thumb-label="always"
            prepend-icon="$vuetify.icons.mdiPalette"
            dense
            :hint="$t('home.palette.hint')"
            persistent-hint
            @end="censusImage"
          ></v-slider>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import ColorDust from '~/packages/color-dust'
import ChartControl from '~/components/control/ChartControl'
export default {
  components: {
    ChartControl,
  },
  data() {
    return {
      loading: false,
      palette: true,
      colorDust: {},
      file: null,
      url: '',
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
    this.colorDust.K = this.K
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
      this.file = null
      this.$store.dispatch('resetApp')
    },
    async startProcess(type) {
      if (type === 'file') {
        if (!this.file) {
          return
        }
        this.loading = true
        this.message = await this.colorDust.readFile(this.file)
      } else if (type === 'url') {
        if (!this.url) {
          this.$toast.error(this.$t('home.url.error'))
          return
        }
        this.loading = true
        this.message = await this.colorDust.readFile(this.url)
      }
      if (this.message) {
        // 读取结果提示信息
        this.$toast.info(this.message)
      }

      const colorsInfo = this.colorDust.colorsInfo
      const mainColor = this.colorDust.mainColor

      this.$store.commit('setColorsInfo', colorsInfo)
      this.$store.commit('setClusterColors', this.colorDust.clusterColors)
      this.$store.commit('setMainColor', mainColor)
      this.$store.commit('setAverageColor', this.colorDust.averageColor)
      this.$store.commit('setProcessInfo', this.colorDust.processInfo)
      // colors
      this.$store.commit('colors/setTotal', this.colorDust.info.total)
      this.$store.commit('colors/setInitSeed', this.colorDust.initSeed)
      // theme
      const primaryColor = this.colorDust.averageColor
      const accentColor = mainColor[0]
      this.$vuetify.theme.dark = accentColor.isDark()
      this.$store.commit('theme/setPrimaryColor', primaryColor)
      this.$store.commit('theme/setAccentColor', accentColor)
      // draw
      if (this.K) {
        this.colorDust.drawPalette()
      }

      this.loading = false
      this.$toast.success(this.$t('tooltip.finish'))
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
