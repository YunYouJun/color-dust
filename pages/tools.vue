<template>
  <div>
    <v-card class="showcase-wrap">
      <canvas ref="blurCanvas" class="showcase"></canvas>
    </v-card>
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
        @change="readImage"
        @click:clear="handleClearClick"
      ></v-file-input>
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pixelRatio: window.devicePixelRatio || 1,
      file: null,
    }
  },
  methods: {
    readImage() {
      if (!this.file) return
      let url = this.file
      // to base64
      if (url instanceof File) {
        const reader = new FileReader()
        reader.readAsDataURL(url)
        return new Promise((resolve) => {
          reader.onload = async (e) => {
            await this.drawToCanvas(e.target.result, this.$refs.blurCanvas)
            resolve()
          }
        })
      } else {
        const xhr = new XMLHttpRequest()
        return new Promise((resolve) => {
          xhr.onload = async (e) => {
            url = URL.createObjectURL(e.target.response)
            await this.drawToCanvas(url, this.$refs.blurCanvas)
            resolve()
          }
          xhr.open('GET', url, true)
          xhr.responseType = 'blob'
          xhr.send()
        })
      }
    },
    drawToCanvas(src, canvas) {
      const pixelRatio = this.pixelRatio
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = src
      img.crossOrigin = 'anonymous'
      return new Promise((resolve) => {
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
          resolve()
        }
      })
    },
    blur() {
      // console.log('blur')
    },
    handleClearClick() {
      this.colorDust.clearCanvas()
      this.$store.dispatch('resetApp')
    },
  },
}
</script>

<style></style>
