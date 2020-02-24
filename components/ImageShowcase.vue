<template>
  <div>
    <v-card
      class="showcase-wrap"
      :class="{ censused: bgColor }"
      :style="{ backgroundColor: bgColor }"
    >
      <canvas ref="canvasShowcase" class="showcase"></canvas>
    </v-card>
    <v-alert border="left" class="mt-4">
      <v-slider
        v-model="K"
        class="mt-5"
        min="3"
        max="20"
        thumb-label="always"
        prepend-icon="color_lens"
        dense
        hint="How many colors?"
        @end="censusImage"
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
        hide-details
        :loading="isLoading"
        @change="readFile"
        @click:clear="handleClearClick"
      ></v-file-input>
    </v-alert>
    <v-snackbar v-model="snackbar">
      {{ message }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { rgbToHsl, hslToRgb, rgbToHex } from '~/assets/js/utils.js'
export default {
  data() {
    return {
      bgColor: '',
      file: null,
      K: 6,
      showSave: false,
      isLoading: false,
      snackbar: false,
      message: ''
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
    chooseSeedColors(colors, num) {
      const initSeed = []
      const len = colors.length
      for (let i = 0; i < len; i++) {
        const l = initSeed.length
        const color = colors[i]
        if (!i) {
          color.category = 0
          initSeed.push({
            h: color.h,
            s: color.s,
            l: color.l,
            category: color.category,
            fre: color.fre
          })
          continue
        }
        let j = 0
        for (; j < l; j++) {
          const hDiff = Math.abs(initSeed[j].h - color.h)
          const sDiff = Math.abs(initSeed[j].s - color.s)
          const lDiff = Math.abs(initSeed[j].l - color.l)
          if (hDiff + sDiff + lDiff < 45) {
            break
          }
        }
        if (j === l) {
          color.category = initSeed.length
          initSeed.push({
            h: color.h,
            s: color.s,
            l: color.l,
            category: color.category,
            fre: color.fre
          })
        }
        if (initSeed.length >= num) {
          break
        }
      }
      return initSeed
    },
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
      const colors = this.$store.state.clusterColors
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
      this.$store.dispatch('resetApp')
    },
    kMC(colors, seeds, maxStep) {
      let iterationCount = 0

      while (iterationCount++ < maxStep) {
        // filter seeds
        seeds = seeds.filter((seed) => {
          return seed
        })

        // divide colors into different categories with duff's device
        let len = colors.length
        let count = (len / 8) ^ 0
        let start = len % 8
        while (start--) {
          this.classifyColor(colors[start], seeds)
        }
        while (count--) {
          this.classifyColor(colors[--len], seeds)
          this.classifyColor(colors[--len], seeds)
          this.classifyColor(colors[--len], seeds)
          this.classifyColor(colors[--len], seeds)
          this.classifyColor(colors[--len], seeds)
          this.classifyColor(colors[--len], seeds)
          this.classifyColor(colors[--len], seeds)
          this.classifyColor(colors[--len], seeds)
        }

        // compute center of category
        len = colors.length
        const hslCount = []
        let category
        while (len--) {
          category = colors[len].category
          if (!hslCount[category]) {
            hslCount[category] = {}
            hslCount[category].h = 0
            hslCount[category].s = 0
            hslCount[category].l = 0
            hslCount[category].freCount = colors[len].fre
          } else {
            hslCount[category].freCount += colors[len].fre
          }
        }
        len = colors.length
        while (len--) {
          category = colors[len].category
          hslCount[category].h +=
            (colors[len].h * colors[len].fre) / hslCount[category].freCount
          hslCount[category].s +=
            (colors[len].s * colors[len].fre) / hslCount[category].freCount
          hslCount[category].l +=
            (colors[len].l * colors[len].fre) / hslCount[category].freCount
        }
        const flag = hslCount.every((ele, index) => {
          return (
            Math.abs(ele.h - seeds[index].h) < 0.5 &&
            Math.abs(ele.s - seeds[index].s) < 0.5 &&
            Math.abs(ele.l - seeds[index].l) < 0.5
          )
        })
        seeds = hslCount.map((ele, index) => {
          return {
            h: ele.h,
            s: ele.s,
            l: ele.l,
            category: index,
            fre: ele.freCount
          }
        })
        if (flag) {
          break
        }
      }
      // console.log('KMC iteration ' + iterationCount)
      seeds.sort(function(pre, next) {
        let preRgb = hslToRgb(pre.h, pre.s, pre.l)
        preRgb = preRgb[0] + preRgb[1] + preRgb[2]
        // let next_h = next.h;
        // next_h = next_h < 30 ? (next_h+330) : next_h;
        let nextRgb = hslToRgb(next.h, next.s, next.l)
        nextRgb = nextRgb[0] + nextRgb[1] + nextRgb[2]
        return nextRgb - preRgb
      })
      return [seeds, iterationCount]
    },
    classifyColor(color, classes) {
      let len = classes.length
      let min = 10000
      let minIndex
      while (len--) {
        const distance =
          Math.abs(classes[len].h - color.h) +
          Math.abs(classes[len].s - color.s) +
          Math.abs(classes[len].l - color.l)
        if (distance < min) {
          min = distance
          minIndex = len
        }
      }
      color.category = minIndex
    },
    drawToCanvas(imgData) {
      this.handleClearClick()
      const pixelRatio = this.pixelRatio
      const canvas = this.$refs.canvasShowcase
      const ctx = this.ctx
      const img = new Image()
      img.src = imgData
      return new Promise((resolve, reject) => {
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
    readFile() {
      if (!this.file) {
        return false
      }
      this.isLoading = true
      const reader = new FileReader()
      // to base64
      reader.readAsDataURL(this.file)
      reader.onload = async (e) => {
        this.isLoading = false
        await this.drawToCanvas(e.target.result)
        this.censusImage()
      }
    },
    censusImage() {
      if (!this.file) {
        return
      }
      const canvas = this.$refs.canvasShowcase
      const ctx = this.ctx
      const pixelRatio = this.pixelRatio

      let beginTime = new Date().getTime()
      const processInfo = {
        colors: 0,
        censusTime: 0,
        kmeansIteration: 0,
        kmeansTime: 0,
        top5Count: 0
      }
      let imageData = null
      if (this.isHorizontal) {
        imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height - 100 * pixelRatio
        )
      } else {
        imageData = ctx.getImageData(
          0,
          0,
          canvas.width - 100 * pixelRatio,
          canvas.height
        )
      }
      if (!imageData) {
        this.message =
          'Can not read image data, maybe because of cross-domain limitation.'
        this.snackbar = true
        return
      }
      const keys = []
      let colorsInfo = []
      let hKey, sKey, lKey, r, g, b
      let pixelCount = 0
      const pixelStep = imageData.height * imageData.width < 600 * 600 ? 1 : 2
      // console.log('pixel step', pixelStep)
      let colorStep = Math.round(
        0.1066 * this.K * this.K - 2.7463 * this.K + 17.2795
      )
      colorStep = colorStep < 4 ? 4 : colorStep
      processInfo.colorStep = colorStep

      let hsl, key
      for (let row = 1; row < imageData.height - 1; ) {
        for (let col = 1; col < imageData.width - 1; ) {
          r = imageData.data[row * imageData.width * 4 + col * 4]
          g = imageData.data[row * imageData.width * 4 + col * 4 + 1]
          b = imageData.data[row * imageData.width * 4 + col * 4 + 2]
          hsl = rgbToHsl(r, g, b)
          if (hsl[2] > 97 || (hsl[2] > 95 && hsl[1] < 30)) {
            col += pixelStep
            continue // too bright
          }
          if (hsl[2] < 3 || (hsl[2] < 5 && hsl[1] < 30)) {
            col += pixelStep
            continue // too dark
          }
          pixelCount++
          hKey = Math.floor(hsl[0] / 10) * 10000
          sKey = Math.floor(hsl[1] / 5) * 100
          lKey = Math.floor(hsl[2] / 5)
          key = hKey + sKey + lKey
          const index = keys.indexOf(key)
          if (index < 0) {
            keys.push(key)
            colorsInfo.push({
              key,
              fre: 1,
              r,
              g,
              b,
              h: hsl[0],
              s: hsl[1],
              l: hsl[2],
              category: -1
            })
          } else {
            colorsInfo[index].fre++
          }
          col += pixelStep
        }
        row += pixelStep
      }
      processInfo.pixelCount = pixelCount
      processInfo.censusTime = new Date().getTime() - beginTime
      processInfo.colors = colorsInfo.length
      // console.log('time for process all pixel: ', processInfo.censusTime)

      beginTime = new Date().getTime()
      // sort and filter rgbCensus
      colorsInfo.sort(function(pre, next) {
        return next.fre - pre.fre
      })
      let len = colorsInfo.length
      // console.log('before filter: ', len)
      colorsInfo = colorsInfo.filter((color) => {
        // isolated color
        const flag = color.fre < 5 - pixelStep && len > 400
        return !flag
      })
      // console.log('after filter: ', colorsInfo.length)
      const mainColor = [colorsInfo[0], colorsInfo[1], colorsInfo[2]]
      // k-mean clustering
      const initSeed1 = this.chooseSeedColors(colorsInfo, this.K)
      const clusterRes = this.kMC(colorsInfo, initSeed1, 100)
      let clusterRes1 = clusterRes[0]
      clusterRes1 = clusterRes1.map((color) => {
        return rgbToHex(hslToRgb(color.h, color.s, color.l))
      })

      let rCount = 0
      let gCount = 0
      let bCount = 0
      let fCount = 0
      len = colorsInfo.length
      while (len--) {
        rCount += colorsInfo[len].r * colorsInfo[len].fre
        gCount += colorsInfo[len].g * colorsInfo[len].fre
        bCount += colorsInfo[len].b * colorsInfo[len].fre
        fCount += colorsInfo[len].fre
      }

      let averageColor = rgbToHsl(
        Math.floor(rCount / fCount),
        Math.floor(gCount / fCount),
        Math.floor(bCount / fCount)
      )
      averageColor = {
        h: averageColor[0],
        s: averageColor[1],
        l: averageColor[2]
      }

      this.bgColor =
        'rgba(' +
        colorsInfo[0].r +
        ',' +
        colorsInfo[0].g +
        ',' +
        colorsInfo[0].b +
        ',0.3)'

      const primaryColor =
        'rgba(' +
        colorsInfo[0].r +
        ',' +
        colorsInfo[0].g +
        ',' +
        colorsInfo[0].b +
        ',0.8)'

      const accentColor =
        'rgba(' +
        colorsInfo[2].r +
        ',' +
        colorsInfo[2].g +
        ',' +
        colorsInfo[2].b +
        ',0.8)'

      processInfo.kmeansTime = +new Date() - beginTime
      processInfo.kmeansIteration = clusterRes[1]
      // console.log('time for K-means: ', processInfo.kmeansTime)
      const info = this.imageScore(colorsInfo)
      processInfo.top5Count = info.top5Count * 100
      this.$store.commit('setColorsInfo', colorsInfo)
      this.$store.commit('setClusterColors', clusterRes1)
      this.$store.commit('setMainColor', mainColor)
      this.$store.commit('setAverageColor', averageColor)
      this.$store.commit('setProcessInfo', processInfo)
      this.updateLoopColors(mainColor, clusterRes[0])
      // theme
      this.$store.commit('theme/setPrimaryColor', primaryColor)
      this.$store.commit('theme/setAccentColor', accentColor)
      // draw
      this.drawPalette()
    },
    imageScore(colorInfo) {
      const info = {
        colorCount: Math.log10(colorInfo.length),
        average: 0,
        variance: 0,
        top50Count: 0,
        top50Average: 0,
        top50Variance: 0,
        top20Count: 0,
        top20Average: 0,
        top20Variance: 0,
        top10Count: 0,
        top10Average: 0,
        top10Variance: 0,
        top5Count: 0,
        top5Average: 0,
        top5Variance: 0
      }
      let average = 0
      let variance = 0
      let count = 0
      let top50Count = 0
      let top50Average = 0
      let top50Variance = 0
      let top20Count = 0
      let top20Average = 0
      let top20Variance = 0
      let top10Count = 0
      let top10Average = 0
      let top10Variance = 0
      let top5Count = 0
      let top5Average = 0
      let top5Variance = 0
      let len = colorInfo.length
      let color
      while (len--) {
        color = colorInfo[len]
        count += color.fre
        if (len < 50) {
          top50Count += color.fre
          if (len < 20) {
            top20Count += color.fre
            if (len < 10) {
              top10Count += color.fre
              if (len < 5) {
                top5Count += color.fre
              }
            }
          }
        }
      }
      len = colorInfo.length
      info.average = Math.log10(count / len)
      info.top50Average = Math.log10(top50Count / 50)
      info.top50Count = top50Count / count
      info.top20Average = Math.log10(top20Count / 20)
      info.top20Count = top20Count / count
      info.top10Average = Math.log10(top10Count / 10)
      info.top10Count = top10Count / count
      info.top5Average = Math.log10(top5Count / 5)
      info.top5Count = top5Count / count
      average = count / len
      top50Average = top50Count / 50
      top20Average = top20Count / 50
      top10Average = top10Count / 50
      top5Average = top5Count / 50
      while (len--) {
        color = colorInfo[len]
        variance += (color.fre - average) * (color.fre - average)
        if (len < 50) {
          top50Variance +=
            (color.fre - top50Average) * (color.fre - top50Average)
          if (len < 20) {
            top20Variance +=
              (color.fre - top20Average) * (color.fre - top20Average)
            if (len < 10) {
              top10Variance +=
                (color.fre - top10Average) * (color.fre - top10Average)
              if (len < 5) {
                top5Variance +=
                  (color.fre - top5Average) * (color.fre - top5Average)
              }
            }
          }
        }
      }
      len = colorInfo.length
      variance = Math.sqrt(variance / len)
      top50Variance = Math.sqrt(top50Variance / 50)
      top20Variance = Math.sqrt(top20Variance / 50)
      top10Variance = Math.sqrt(top10Variance / 50)
      top5Variance = Math.sqrt(top5Variance / 50)
      info.variance = Math.log10(variance)
      info.top50Variance = Math.log10(top50Variance)
      info.top20Variance = Math.log10(top20Variance)
      info.top10Variance = Math.log10(top10Variance)
      info.top5Variance = Math.log10(top5Variance)
      // normalization
      let max = -1
      for (const key in info) {
        if (info[key] > max) {
          max = info[key]
        }
      }
      for (const key in info) {
        if (info[key] > 1) {
          info[key] = info[key] / max
        }
      }
      const t = this.$store.state.net.run(info)
      const t2 = this.$store.state.net2.run(info)
      const resCount = t.first + t.second + t.third + t.fourth
      const score =
        (100 * t.first) / resCount +
        (85 * t.second) / resCount +
        (75 * t.third) / resCount +
        (65 * t.fourth) / resCount
      const resCount2 = t2.first + t2.second + t2.third + t2.fourth
      const score2 =
        (100 * t2.first) / resCount2 +
        (85 * t2.second) / resCount2 +
        (75 * t2.third) / resCount2 +
        (65 * t2.fourth) / resCount2
      const scoreFinal = score * 0.2 + score2 * 0.8
      this.$store.commit('setScore', scoreFinal)
      return info
    },
    updateLoopColors(mainColor, clusterRes) {
      const scale = 1.1
      const mcR =
        mainColor[0].r * scale < 255 ? Math.floor(mainColor[0].r * scale) : 255
      const mcG =
        mainColor[0].g * scale < 255 ? Math.floor(mainColor[0].g * scale) : 255
      const mcB =
        mainColor[0].b * scale < 255 ? Math.floor(mainColor[0].b * scale) : 255
      const mcR2 =
        mcR * scale * scale < 255 ? Math.floor(mcR * scale * scale) : 255
      const mcG2 =
        mcG * scale * scale < 255 ? Math.floor(mcG * scale * scale) : 255
      const mcB2 =
        mcB * scale * scale < 255 ? Math.floor(mcB * scale * scale) : 255
      const step = Math.floor(clusterRes.length / 3)
      const bc1 = hslToRgb(clusterRes[0].h, clusterRes[0].s, clusterRes[0].l)
      const bc2 = hslToRgb(
        clusterRes[step].h,
        clusterRes[step].s,
        clusterRes[step].l
      )
      const bc3 = hslToRgb(
        clusterRes[step * 2].h,
        clusterRes[step * 2].s,
        clusterRes[step * 2].l
      )
      const loopColors = [
        [
          'rgb(' + mcR + ',' + mcG + ',' + mcB + ')',
          'rgb(' + mcR2 + ',' + mcG2 + ',' + mcB2 + ')'
        ],
        [
          'rgba(' + bc1[0] + ',' + bc1[1] + ',' + bc1[2] + ',0.4)',
          'rgba(' + bc1[0] + ',' + bc1[1] + ',' + bc1[2] + ',0.7)'
        ],
        [
          'rgba(' + bc2[0] + ',' + bc2[1] + ',' + bc2[2] + ',0.4)',
          'rgba(' + bc2[0] + ',' + bc2[1] + ',' + bc2[2] + ',0.7)'
        ],
        [
          'rgba(' + bc3[0] + ',' + bc3[1] + ',' + bc3[2] + ',0.4)',
          'rgba(' + bc3[0] + ',' + bc3[1] + ',' + bc3[2] + ',0.7)'
        ]
      ]
      this.$store.commit('setLoopColors', loopColors)
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
