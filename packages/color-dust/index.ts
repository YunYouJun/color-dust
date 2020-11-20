import { TinyColor } from '@ctrl/tinycolor'
import { AnalysisInfo, BaseColorInfo, ColorInfo, ProcessInfo } from './types'
import { getHslKey, isTooDark, isTooLight } from './utils'
export default class ColorDust {
  ctx: CanvasRenderingContext2D | null
  pixelRatio: number
  oriWidth: number
  oriHeight: number
  /**
   * 各种色彩信息
   */
  colorsInfo: ColorInfo[]
  processInfo: ProcessInfo
  /**
   * 前三种主色调
   */
  mainColor: TinyColor[]
  /**
   * 平均色
   */
  averageColor: TinyColor
  /**
   * 迭代次数
   */
  iteration: number
  score: string

  /**
   * 图像是否水平
   */
  isHorizontal: boolean

  /**
   * 初始种子
   */
  initSeed: ColorInfo[]
  /**
   * 簇 色彩
   */
  clusterColors: ColorInfo[]
  /**
   * 处理信息
   */
  info: AnalysisInfo
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
      numberOfColors: 0,
      censusTime: 0,
      kmeansIteration: 0,
      kmeansTime: 0,
      top5Count: 0,

      pixelCount: 0,
    }
    this.mainColor = []
    this.averageColor = new TinyColor()
    this.iteration = 0
    this.score = ''

    this.isHorizontal = true

    this.initSeed = []
    this.clusterColors = []
    this.info = {
      total: 0,
      top50Count: 0,
      top20Count: 0,
      top10Count: 0,
      top5Count: 0,
    }
  }

  /**
   * 读取文件
   * @param url
   */
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

  /**
   * 统计图片信息
   */
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
    const pixelStep = imageData.height * imageData.width < 600 * 600 ? 1 : 2
    let colorStep = Math.round(
      0.1066 * this.K * this.K - 2.7463 * this.K + 17.2795
    )
    colorStep = colorStep < 4 ? 4 : colorStep

    // for bubble
    // reset
    let colorsInfo = []
    // get color
    const processInfo = this.processInfo
    const keys = []
    for (let row = 1; row < imageData.height - 1; row += pixelStep) {
      for (let col = 1; col < imageData.width - 1; col += pixelStep) {
        const r = imageData.data[row * imageData.width * 4 + col * 4]
        const g = imageData.data[row * imageData.width * 4 + col * 4 + 1]
        const b = imageData.data[row * imageData.width * 4 + col * 4 + 2]

        const color = new TinyColor({ r, g, b })
        if (isTooLight(color) || isTooDark(color)) {
          continue
        }
        processInfo.pixelCount++
        // hex 作为 key 会很慢
        const key = getHslKey(color)
        const index = keys.indexOf(key)

        if (index < 0) {
          keys.push(key)
          colorsInfo.push({
            key,
            color,
            count: 1,
            category: -1,
          })
        } else {
          // countquence
          colorsInfo[index].count++
        }
      }
    }

    processInfo.colorStep = colorStep
    processInfo.censusTime = new Date().getTime() - beginTime
    processInfo.numberOfColors = colorsInfo.length

    beginTime = new Date().getTime()
    // sort and filter rgbCensus
    colorsInfo.sort(function (pre, next) {
      return next.count - pre.count
    })

    // console.log('before filter: ', len)
    colorsInfo = colorsInfo.filter((colorInfo) => {
      // isolated color
      const flag = colorInfo.count < 5 - pixelStep && colorsInfo.length > 400
      // filter it
      return !flag
    })

    // top three color
    this.mainColor = [
      colorsInfo[0].color,
      colorsInfo[1].color,
      colorsInfo[2].color,
    ]

    // k-mean clustering
    const initSeed = this.chooseSeedColors(colorsInfo, this.K)
    this.initSeed = initSeed
    this.clusterColors = this.kMC(colorsInfo, initSeed, 100)

    let rCount = 0
    let gCount = 0
    let bCount = 0
    let fCount = 0

    // 过滤后的 colorsInfo 长度
    colorsInfo.forEach((colorInfo) => {
      const rgbColor = colorInfo.color.toRgb()
      rCount += rgbColor.r * colorInfo.count
      gCount += rgbColor.g * colorInfo.count
      bCount += rgbColor.b * colorInfo.count
      fCount += colorInfo.count
    })

    this.averageColor = new TinyColor({
      r: Math.floor(rCount / fCount),
      g: Math.floor(gCount / fCount),
      b: Math.floor(bCount / fCount),
    })

    processInfo.kmeansTime = +new Date() - beginTime
    processInfo.kmeansIteration = this.iteration
    this.info = this.countColor(colorsInfo)
    processInfo.top5Count = this.info.top5Count * 100
    this.processInfo = processInfo

    this.colorsInfo = colorsInfo
  }

  /**
   * 选择初始种子
   * @param {*} colors
   * @param {*} num
   */
  chooseSeedColors(colors: ColorInfo[], num: number) {
    const initSeed = []
    const len = colors.length
    for (let i = 0; i < len; i++) {
      const l = initSeed.length
      const colorInfo = colors[i]
      // 第一个种子
      if (i === 0) {
        colorInfo.category = 0
        initSeed.push(colorInfo)
      } else {
        let j = 0
        for (; j < l; j++) {
          const curSeed = initSeed[j].color.toHsl()
          const hslColor = colorInfo.color.toHsl()
          const hDiff = Math.abs(curSeed.h - hslColor.h)
          const sDiff = Math.abs(curSeed.s - hslColor.s)
          const lDiff = Math.abs(curSeed.l - hslColor.l)
          if (hDiff + sDiff * 100 + lDiff * 100 < 45) {
            break
          }
        }
        if (j === l) {
          colorInfo.category = initSeed.length
          initSeed.push(colorInfo)
        }
        if (initSeed.length >= num) {
          break
        }
      }
    }
    return initSeed
  }

  /**
   * K-Means 主计算过程
   * @param colors 色彩们
   * @param seeds 种子
   * @param maxStep 最大迭代次数
   */
  kMC(colorsInfo: ColorInfo[], seeds: ColorInfo[], maxStep: number) {
    this.iteration = 0

    while (this.iteration++ < maxStep) {
      // filter seeds
      seeds = seeds.filter((seed: any) => {
        return seed
      })

      // divide colors into different categories with duff's device
      let len = colorsInfo.length
      let count = (len / 8) ^ 0
      let start = len % 8
      while (start--) {
        this.classifyColor(colorsInfo[start], seeds)
      }
      while (count--) {
        this.classifyColor(colorsInfo[--len], seeds)
        this.classifyColor(colorsInfo[--len], seeds)
        this.classifyColor(colorsInfo[--len], seeds)
        this.classifyColor(colorsInfo[--len], seeds)
        this.classifyColor(colorsInfo[--len], seeds)
        this.classifyColor(colorsInfo[--len], seeds)
        this.classifyColor(colorsInfo[--len], seeds)
        this.classifyColor(colorsInfo[--len], seeds)
      }

      // compute center of category
      len = colorsInfo.length
      const hslCount: BaseColorInfo[] = []
      let category: number
      while (len--) {
        category = colorsInfo[len].category
        if (!hslCount[category]) {
          hslCount[category] = {
            color: new TinyColor({ h: 0, s: 0, l: 0 }),
            count: colorsInfo[len].count,
          }
        } else {
          hslCount[category].count += colorsInfo[len].count
        }
      }
      len = colorsInfo.length
      // 统计平均 hsl
      colorsInfo.forEach((colorInfo) => {
        category = colorInfo.category
        const hslColor = hslCount[category].color.toHsl()
        const colorInfoHSL = colorInfo.color.toHsl()
        const hCount =
          hslColor.h +
          (colorInfoHSL.h * colorInfo.count) / hslCount[category].count
        const sCount =
          hslColor.s +
          (colorInfoHSL.s * colorInfo.count) / hslCount[category].count
        const lCount =
          hslColor.l +
          (colorInfoHSL.l * colorInfo.count) / hslCount[category].count

        hslCount[category].color = new TinyColor({
          h: hCount,
          s: sCount,
          l: lCount,
        })
      })

      // 每一个聚类种子都和附近的颜色差值很小
      const flag = hslCount.every((el, index) => {
        const hslColor = el.color.toHsl()
        const hslSeedColor = seeds[index].color.toHsl()
        return (
          Math.abs(hslColor.h - hslSeedColor.h) < 0.5 &&
          Math.abs(hslColor.s - hslSeedColor.s) < 0.005 &&
          Math.abs(hslColor.l - hslSeedColor.l) < 0.005
        )
      })
      seeds = hslCount.map((el, index) => {
        return {
          color: el.color,
          category: index,
          count: el.count,
        }
      })
      if (flag) {
        break
      }
    }
    // console.log('KMC iteration ' + iterationCount)
    seeds.sort((pre: ColorInfo, next: ColorInfo) => {
      const preRgb = pre.color.toRgb()
      const preTotal = preRgb.r + preRgb.g + preRgb.b
      // let next_h = next.h;
      // next_h = next_h < 30 ? (next_h+330) : next_h;
      const nextRgb = next.color.toRgb()
      const nextTotal = nextRgb.r + nextRgb.g + nextRgb.b
      return nextTotal - preTotal
    })
    return seeds
  }

  /**
   * 颜色分类（蕨类过程）
   * @param color
   * @param classes
   */
  classifyColor(colorInfo: ColorInfo, classes: ColorInfo[]) {
    let len = classes.length
    let min = 10000
    let minIndex = -1
    while (len--) {
      const hslColor = colorInfo.color.toHsl()
      const hslClass = classes[len].color.toHsl()
      const distance =
        Math.abs(hslClass.h - hslColor.h) +
        Math.abs(hslClass.s - hslColor.s) * 100 +
        Math.abs(hslClass.l - hslColor.l) * 100
      if (distance < min) {
        min = distance
        minIndex = len
      }
    }
    // 颜色所属的类别
    colorInfo.category = minIndex
  }

  /**
   * color 计数
   * @param colorInfo
   */
  countColor(colorsInfo: ColorInfo[]) {
    const info = this.info
    let total = 0
    let top50Count = 0
    let top20Count = 0
    let top10Count = 0
    let top5Count = 0
    let len = colorsInfo.length
    let color
    while (len--) {
      color = colorsInfo[len]
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
    len = colorsInfo.length
    info.total = total
    info.top50Count = top50Count / total
    info.top20Count = top20Count / total
    info.top10Count = top10Count / total
    info.top5Count = top5Count / total
    return info
  }

  /**
   * 绘制调色板
   */
  drawPalette() {
    const pixelRatio = this.pixelRatio
    const canvas = this.canvas
    const ctx = this.ctx
    if (!ctx) return
    const len = this.isHorizontal ? canvas.width : canvas.height
    const interval = len * (this.K < 10 ? 0.02 : 0.01)
    // interval *= pixelRatio;
    const p = (len - (this.K - 1) * interval) / this.K
    if (this.clusterColors.length === 0) {
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
      ctx.fillStyle = this.clusterColors[i].color.toHexString()
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
