<template>
  <div>
    <div class="showcase-wrap" :class="{}">
      <canvas ref="canvasShowcase" class="showcase"></canvas>
    </div>
    <v-slider
      v-model="K"
      class="mt-5"
      min="3"
      max="20"
      thumb-label="always"
      prepend-icon="color_lens"
      dense
      hint="How many colors?"
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
      :loading="isLoading"
      @change="readFile"
      @click:clear="handleClearClick"
    >
    </v-file-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      bgC: '',
      K: 6,
      clusterColors: [],
      showSave: false,
      isLoading: false
    }
  },
  mounted() {
    this.pixelRatio = window.devicePixelRatio || 1
    const canvas = this.$refs.canvasShowcase
    canvas.width = this.pixelRatio * parseInt(getComputedStyle(canvas).width)
    canvas.height = this.pixelRatio * parseInt(getComputedStyle(canvas).height)
    this.oriWidth = canvas.width
    this.oriHeight = canvas.height
    this.ctx = canvas.getContext('2d')
  },
  methods: {
    clearCanvas() {
      const canvas = this.$refs.canvasShowcase
      canvas.width = this.oriWidth
      canvas.height = this.oriHeight
    },
    drawPalette() {
      const pixelRatio = this.pixelRatio
      const canvas = this.$refs.canvasShowcase
      const ctx = this.ctx
      const len = this.isHorizontal ? canvas.width : canvas.height
      const interval = len * (this.K < 10 ? 0.02 : 0.01)
      // interval *= pixelRatio;
      const p = (len - (this.K - 1) * interval) / this.K
      const colors = this.clusterColors
      if (colors.length === 0) {
        return
      }
      if (this.isHorizontal) {
        ctx.clearRect(
          0,
          canvas.height - 90 * pixelRatio,
          canvas.width,
          90 * pixelRatio
        )
      } else {
        ctx.clearRect(
          canvas.width - 90 * pixelRatio,
          0,
          90 * pixelRatio,
          canvas.height
        )
      }
      for (let i = 0; i < this.K; i++) {
        ctx.fillStyle = colors[i]
        if (this.isHorizontal) {
          ctx.fillRect(
            (p + interval) * i,
            canvas.height - 90 * pixelRatio,
            p,
            90 * pixelRatio
          )
        } else {
          ctx.fillRect(
            canvas.width - 90 * pixelRatio,
            (p + interval) * i,
            90 * pixelRatio,
            p
          )
        }
      }
    },
    handleClearClick() {
      this.clearCanvas()
      this.$store.commit('resetApp')
    },
    drawToCanvas(imgData) {
      this.handleClearClick()
      const pixelRatio = this.pixelRatio
      this.isLoading = false
      const canvas = this.$refs.canvasShowcase
      const ctx = this.ctx
      const img = new Image()
      img.src = imgData
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let _w = 0
        let _h = 0
        if (img.width < img.height) {
          _w = 100 * pixelRatio
          this.isHorizontal = false
        } else {
          _h = 100 * pixelRatio
          this.isHorizontal = true
        }
        let imgWidth =
          img.width > (canvas.width - _w) / pixelRatio
            ? (canvas.width - _w) / pixelRatio
            : img.width
        let imgHeight =
          img.height > (canvas.height - _h) / pixelRatio
            ? (canvas.height - _h) / pixelRatio
            : img.height
        const scale =
          imgWidth / img.width < imgHeight / img.height
            ? imgWidth / img.width
            : imgHeight / img.height
        imgWidth = img.width * scale
        imgHeight = img.height * scale
        canvas.style.width = imgWidth + _w / pixelRatio + 'px'
        canvas.style.height = imgHeight + _h / pixelRatio + 'px'
        canvas.width = imgWidth * pixelRatio + _w
        canvas.height = imgHeight * pixelRatio + _h
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          imgWidth * pixelRatio,
          imgHeight * pixelRatio
        )
      }
    },
    readFile() {
      if (!this.file) {
        return false
      }
      this.isLoading = true
      const reader = new FileReader()
      // to base64
      reader.readAsDataURL(this.file)
      reader.onload = (e) => {
        this.drawToCanvas(e.target.result)
      }
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

  &.censused {
    z-index: 0;

    &::after {
      display: none;
      animation: none;
    }
  }

  &-wrap {
    position: relative;
    overflow: hidden;
    z-index: 0;
    text-align: center;
    line-height: 0;

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
