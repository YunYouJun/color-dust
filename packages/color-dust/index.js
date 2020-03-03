import brain from 'brain'
import { rgbToHsl, hslToRgb, rgbToHex } from './utils'
// train net
import { network1, network2 } from './trainData'
export default class ColorDust {
  constructor(canvas) {
    this.net = new brain.NeuralNetwork()
    this.net2 = new brain.NeuralNetwork()
    this.net.fromJSON(network1)
    this.net2.fromJSON(network2)
    if (canvas) {
      this.canvas = canvas
    } else {
      this.canvas = document.createElement('canvas')
    }
    this.ctx = this.canvas.getContext('2d')
    this.pixelRatio = window.devicePixelRatio || 1
    this.canvas.width =
      this.pixelRatio * parseInt(getComputedStyle(canvas).width)
    this.canvas.height =
      this.pixelRatio * parseInt(getComputedStyle(canvas).height)
    this.oriWidth = canvas.width
    this.oriHeight = canvas.height
    this.colorsInfo = []
    this.processInfo = {
      colors: 0,
      censusTime: 0,
      kmeansIteration: 0,
      kmeansTime: 0,
      top5Count: 0
    }
    this.mainColor = []
    this.averageColor = []
    this.clusterRes = []
    this.score = ''
    this.K = 6
  }

  readFile(url) {
    const reader = new FileReader()
    // to base64
    reader.readAsDataURL(url)
    return new Promise((resolve) => {
      reader.onload = async (e) => {
        await this.drawToCanvas(e.target.result)
        this.censusImage()
        resolve()
      }
    })
  }

  drawToCanvas(imgData) {
    const pixelRatio = this.pixelRatio
    const canvas = this.canvas
    const ctx = this.ctx
    const img = new Image()
    img.src = imgData
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
  }

  censusImage() {
    const canvas = this.canvas
    const ctx = this.ctx
    const pixelRatio = this.pixelRatio

    let beginTime = new Date().getTime()
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
    // error
    if (!imageData) {
      return 'Can not read image data, maybe because of cross-domain limitation.'
    }
    const keys = []
    let hKey, sKey, lKey, r, g, b
    let pixelCount = 0
    const pixelStep = imageData.height * imageData.width < 600 * 600 ? 1 : 2
    // console.log('pixel step', pixelStep)
    let colorStep = Math.round(
      0.1066 * this.K * this.K - 2.7463 * this.K + 17.2795
    )
    colorStep = colorStep < 4 ? 4 : colorStep

    const processInfo = {
      colors: 0,
      censusTime: 0,
      kmeansIteration: 0,
      kmeansTime: 0,
      top5Count: 0
    }
    processInfo.colorStep = colorStep

    // for bubble
    let colorsInfo = []
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
    this.mainColor = [colorsInfo[0], colorsInfo[1], colorsInfo[2]]
    // k-mean clustering
    const initSeed1 = this.chooseSeedColors(colorsInfo, this.K)
    this.clusterRes = this.kMC(colorsInfo, initSeed1, 100)
    this.clusterColors = this.clusterRes[0]
    this.clusterColors = this.clusterColors.map((color) => {
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

    const averageColor = rgbToHsl(
      Math.floor(rCount / fCount),
      Math.floor(gCount / fCount),
      Math.floor(bCount / fCount)
    )
    this.averageColor = {
      h: averageColor[0],
      s: averageColor[1],
      l: averageColor[2]
    }

    processInfo.kmeansTime = +new Date() - beginTime
    processInfo.kmeansIteration = this.clusterRes[1]
    this.info = this.imageScore(colorsInfo)
    processInfo.top5Count = this.info.top5Count * 100
    this.colorsInfo = colorsInfo
    this.processInfo = processInfo
  }

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
  }

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
  }

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
  }

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
        top50Variance += (color.fre - top50Average) * (color.fre - top50Average)
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
    const t = this.net.run(info)
    const t2 = this.net2.run(info)
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
    this.score = scoreFinal
    return info
  }

  drawPalette() {
    const pixelRatio = this.pixelRatio
    const canvas = this.canvas
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
  }

  clearCanvas() {
    this.canvas.width = this.oriWidth
    this.canvas.height = this.oriHeight
  }
}
