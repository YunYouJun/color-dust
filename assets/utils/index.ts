/**
 * 读取图片
 * @param file
 */
export async function readImage(file: File | string) {
  // to base64
  // 如果是文件形式
  if (file instanceof File) {
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.onload = (e) => {
        resolve(e.target?.result)
      }
      reader.readAsDataURL(file)
    })
  } else if (typeof file === 'string') {
    const objectURL = await fetch(new Request(file))
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        return URL.createObjectURL(blob)
      })
    return objectURL
  }
}

interface DrawOptions {
  hasPalette: boolean
  blur: string
}

/**
 * 绘制到 Canvas
 * @param image
 * @param canvas
 */
export function drawToCanvas(
  image: string,
  canvas: HTMLCanvasElement,
  options?: DrawOptions
) {
  options = Object.assign({ hasPalette: false }, options)

  const pixelRatio = window.devicePixelRatio || 1
  const ctx = canvas.getContext('2d')
  const info = {
    isHorizontal: false,
  }
  if (!ctx) return info
  const img = new Image()
  return new Promise((resolve) => {
    img.onload = () => {
      let paletteWidth = 0
      let paletteHeight = 0

      if (img.width < img.height) {
        info.isHorizontal = false
      } else {
        info.isHorizontal = true
      }

      // 如果有调色板
      if (options?.hasPalette) {
        if (!info.isHorizontal) {
          paletteWidth = 100 * pixelRatio
        } else {
          paletteHeight = 100 * pixelRatio
        }
      }

      let imgWidth =
        img.width > (canvas.width - paletteWidth) / pixelRatio
          ? (canvas.width - paletteWidth) / pixelRatio
          : img.width
      let imgHeight =
        img.height > (canvas.height - paletteHeight) / pixelRatio
          ? (canvas.height - paletteHeight) / pixelRatio
          : img.height

      const widthScale = imgWidth / img.width
      const heightScale = imgHeight / img.height
      const scale = widthScale < heightScale ? widthScale : heightScale

      imgWidth = img.width * scale
      imgHeight = img.height * scale

      canvas.style.width = imgWidth + paletteWidth / pixelRatio + 'px'
      canvas.style.height = imgHeight + paletteHeight / pixelRatio + 'px'

      canvas.width = imgWidth * pixelRatio + paletteWidth
      canvas.height = imgHeight * pixelRatio + paletteHeight

      if (options?.blur) {
        ctx.filter = `blur(${options.blur})`
      }

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
      resolve(info)
    }
    img.src = image
    img.crossOrigin = 'anonymous'
  })
}

/**
 * 清空画布
 * @param canvas
 */
export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  canvas.height = 480
}
