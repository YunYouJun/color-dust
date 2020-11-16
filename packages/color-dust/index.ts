import { ProcessInfo } from './typings'
import { HSL } from './typings/color'
import { rgbToHsl, hslToRgb, rgbToHex, getHslKey } from './utils'
export default class ColorDust {
  ctx: CanvasRenderingContext2D | null
  pixelRatio: number
  oriWidth: number
  oriHeight: number
  colorsInfo: any[]
  processInfo: ProcessInfo
  mainColor: any[]
  averageColor: string | undefined
  clusterRes: any
  score: string

  isHorizontal: boolean

  /**
   * 初始种子
   */
  initSeed: any
  clusterColors: any
  info: any
  constructor(public canvas: HTMLCanvasElement, public K: number = 6) {
    this.ctx = this.canvas.getContext('2d')
    this.pixelRatio = window.devicePixelRatio || 1
    this.canvas.width =
      this.pixelRatio * parseInt(getComputedStyle(this.canvas).width)
    this.canvas.height =
      this.pixelRatio * parseInt(getComputedStyle(this.canvas).height)
    this.oriWidth = this.canvas.width
    this.oriHeight = this.canvas.height
    this.colorsInfo = []
    this.processInfo = {
      colors: 0,
      censusTime: 0,
      kmeansIteration: 0,
      kmeansTime: 0,
      top5Count: 0,
    }
    this.mainColor = []
    this.averageColor = ''
    this.clusterRes = {}
    this.score = ''

    this.isHorizontal = true
  }

  readFile(url: string | File) {
    // to base64
    if (url instanceof File) {
      const reader = new FileReader()
      reader.readAsDataURL(url)
      return new Promise((resolve) => {
        reader.onload = async (e) => {
          if (e.target) {
            await this.drawToCanvas(e.target.result as string)
            this.censusImage()
          }
          resolve()
        }
      })
    } else {
      const xhr = new XMLHttpRequest()
      return new Promise((resolve) => {
        xhr.onload = async (e) => {
          if (e.target) {
            url = URL.createObjectURL((e.target as any).response)
            await this.drawToCanvas(url)
            this.censusImage()
          }
          resolve()
        }
        xhr.open('GET', url as string, true)
        xhr.responseType = 'blob'
        xhr.send()
      })
    }
  }

  drawToCanvas(src: string) {
    const pixelRatio = this.pixelRatio
    const canvas = this.canvas
    const ctx = this.ctx
    if (!ctx) return
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
  }

  censusImage() {
    const canvas = this.canvas
    const ctx = this.ctx
    if (!ctx) return
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
    let r, g, b
    let pixelCount = 0
    const pixelStep = imageData.height * imageData.width < 600 * 600 ? 1 : 2
    let colorStep = Math.round(
      0.1066 * this.K * this.K - 2.7463 * this.K + 17.2795
    )
    colorStep = colorStep < 4 ? 4 : colorStep

    // for bubble
    let colorsInfo = []
    let hsl: number[]
    let key
    // get color
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
        // hex 作为 key 会很慢
        key = getHslKey(hsl[0], hsl[1], hsl[2])
        const index = keys.indexOf(key)

        if (index < 0) {
          keys.push(key)
          colorsInfo.push({
            key,
            count: 1,
            r,
            g,
            b,
            h: hsl[0],
            s: hsl[1],
            l: hsl[2],
            hex: rgbToHex([r, g, b]),
            category: -1,
          })
        } else {
          // countquence
          colorsInfo[index].count++
        }
        col += pixelStep
      }
      row += pixelStep
    }

    const processInfo = {
      colors: 0,
      censusTime: 0,
      kmeansIteration: 0,
      kmeansTime: 0,
      top5Count: 0,

      colorStep,
      pixelCount,
    }

    processInfo.censusTime = new Date().getTime() - beginTime
    processInfo.colors = colorsInfo.length

    beginTime = new Date().getTime()
    // sort and filter rgbCensus
    colorsInfo.sort(function (pre, next) {
      return next.count - pre.count
    })
    let len = colorsInfo.length
    // console.log('before filter: ', len)
    colorsInfo = colorsInfo.filter((color) => {
      // isolated color
      const flag = color.count < 5 - pixelStep && len > 400
      // filter it
      return !flag
    })
    // top three color
    this.mainColor = [
      rgbToHex(colorsInfo[0]),
      rgbToHex(colorsInfo[1]),
      rgbToHex(colorsInfo[2]),
    ]
    // k-mean clustering
    const initSeed = this.chooseSeedColors(colorsInfo, this.K)
    this.initSeed = initSeed
    this.clusterRes = this.kMC(colorsInfo, initSeed, 100)

    this.clusterColors = this.clusterRes.seeds
    this.clusterColors = this.clusterColors.map((color: HSL) => {
      return rgbToHex(hslToRgb(color.h, color.s, color.l))
    })

    let rCount = 0
    let gCount = 0
    let bCount = 0
    let fCount = 0
    len = colorsInfo.length
    while (len--) {
      rCount += colorsInfo[len].r * colorsInfo[len].count
      gCount += colorsInfo[len].g * colorsInfo[len].count
      bCount += colorsInfo[len].b * colorsInfo[len].count
      fCount += colorsInfo[len].count
    }

    this.averageColor = rgbToHex({
      r: Math.floor(rCount / fCount),
      g: Math.floor(gCount / fCount),
      b: Math.floor(bCount / fCount),
    })

    processInfo.kmeansTime = +new Date() - beginTime
    processInfo.kmeansIteration = this.clusterRes.iteration
    this.info = this.countColor(colorsInfo)
    processInfo.top5Count = this.info.top5Count * 100
    this.colorsInfo = colorsInfo
    this.processInfo = processInfo
  }

  /**
   * 选择初始种子
   * @param {*} colors
   * @param {*} num
   */
  chooseSeedColors(colors: any, num: number) {
    const initSeed = []
    const len = colors.length
    for (let i = 0; i < len; i++) {
      const l = initSeed.length
      const color = colors[i]
      // 第一个种子
      if (i === 0) {
        color.category = 0
        initSeed.push({
          h: color.h,
          s: color.s,
          l: color.l,
          category: color.category,
          count: color.count,
        })
      } else {
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
            count: color.count,
          })
        }
        if (initSeed.length >= num) {
          break
        }
      }
    }
    return initSeed
  }

  kMC(colors: any, seeds: any, maxStep: number) {
    let iteration = 0

    while (iteration++ < maxStep) {
      // filter seeds
      seeds = seeds.filter((seed: any) => {
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
      let category: number
      while (len--) {
        category = colors[len].category
        if (!hslCount[category]) {
          hslCount[category] = {
            h: 0,
            s: 0,
            l: 0,
            count: colors[len].count,
          }
        } else {
          hslCount[category].count += colors[len].count
        }
      }
      len = colors.length
      // 统计平均 hsl
      while (len--) {
        category = colors[len].category
        hslCount[category].h +=
          (colors[len].h * colors[len].count) / hslCount[category].count
        hslCount[category].s +=
          (colors[len].s * colors[len].count) / hslCount[category].count
        hslCount[category].l +=
          (colors[len].l * colors[len].count) / hslCount[category].count
      }
      // 每一个聚类种子都和附近的颜色差值很小
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
          count: ele.count,
        }
      })
      if (flag) {
        break
      }
    }
    // console.log('KMC iteration ' + iterationCount)
    seeds.sort(function (pre: HSL, next: HSL) {
      const preRgb = hslToRgb(pre.h, pre.s, pre.l)
      const preTotal = preRgb[0] + preRgb[1] + preRgb[2]
      // let next_h = next.h;
      // next_h = next_h < 30 ? (next_h+330) : next_h;
      const nextRgb = hslToRgb(next.h, next.s, next.l)
      const nextTotal = nextRgb[0] + nextRgb[1] + nextRgb[2]
      return nextTotal - preTotal
    })
    return {
      seeds,
      iteration,
    }
  }

  // 颜色分类（蕨类过程）
  classifyColor(color: any, classes: HSL[]) {
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
    // 颜色所属的类别
    color.category = minIndex
  }

  countColor(colorInfo: any) {
    const info = {
      total: 0,
      top50Count: 0,
      top20Count: 0,
      top10Count: 0,
      top5Count: 0,
    }
    let total = 0
    let top50Count = 0
    let top20Count = 0
    let top10Count = 0
    let top5Count = 0
    let len = colorInfo.length
    let color
    while (len--) {
      color = colorInfo[len]
      total += color.count
      if (len < 50) {
        top50Count += color.count
        if (len < 20) {
          top20Count += color.count
          if (len < 10) {
            top10Count += color.count
            if (len < 5) {
              top5Count += color.count
            }
          }
        }
      }
    }
    len = colorInfo.length
    info.total = total
    info.top50Count = top50Count / total
    info.top20Count = top20Count / total
    info.top10Count = top10Count / total
    info.top5Count = top5Count / total
    return info
  }

  drawPalette() {
    const pixelRatio = this.pixelRatio
    const canvas = this.canvas
    const ctx = this.ctx
    if (!ctx) return
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
