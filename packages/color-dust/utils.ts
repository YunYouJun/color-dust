/**
 * RGB To HSL
 * @param r
 * @param g
 * @param b
 */
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h *= 60
  }

  return [h, s * 100, l * 100]
}

/**
 * HSL To RGB
 * @param h
 * @param s
 * @param l
 */
function hslToRgb(h: number, s: number, l: number) {
  h = h / 360
  s = s / 100
  l = l / 100
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = function (p: number, q: number, t: number) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

/**
 * RGB 模型
 */
interface RGB {
  r: number
  g: number
  b: number
}

/**
 * RGB
 * @param rgb
 */
function rgbToHex(rgb: number[] | RGB) {
  if (!rgb) return
  let color = '#'
  let rgbArray = []
  if (Array.isArray(rgb) && rgb.length === 3) {
    rgbArray = rgb.slice()
  } else if ('r' in rgb && 'g' in rgb && 'b' in rgb) {
    rgbArray = [rgb.r, rgb.g, rgb.b]
  } else {
    return ''
  }
  for (let i = 0; i < rgbArray.length; i++) {
    const hex = rgbArray[i].toString(16)
    color += hex.length < 2 ? '0' + hex : hex
  }
  return color.toUpperCase()
}

/**
 * HEX To RGB
 * @param hex
 */
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * 是否为暗色
 * @param color
 */
function isDark(color: string) {
  const rgbColor: RGB | null = hexToRgb(color)
  if (rgbColor) {
    return rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114 <= 192
  } else {
    return false
  }
}

/**
 * HSL Key
 * @param {*} h
 * @param {*} s
 * @param {*} l
 */
function getHslKey(h: number, s: number, l: number) {
  const hKey = Math.floor(h / 10) * 10000
  const sKey = Math.floor(s / 5) * 100
  const lKey = Math.floor(l / 5)
  return hKey + sKey + lKey
}

export { rgbToHsl, hslToRgb, rgbToHex, isDark, getHslKey }
