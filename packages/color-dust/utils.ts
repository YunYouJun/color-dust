import { TinyColor } from '@ctrl/tinycolor'

/**
 * 太亮了
 * @param color
 */
export function isTooLight(color: TinyColor) {
  const hsl = color.toHsl()
  return hsl.l > 0.97 || (hsl.l > 0.95 && hsl.s < 0.3)
}

/**
 * 太暗了
 * @param color
 */
export function isTooDark(color: TinyColor) {
  const hsl = color.toHsl()
  return hsl.l < 0.03 || (hsl.l < 0.05 && hsl.s < 0.3)
}

/**
 * HSL Key
 * @param color
 */
export function getHslKey(color: TinyColor) {
  const hsl = color.toHsl()
  // HSL 接近的视为一种
  const hKey = Math.floor(hsl.h / 10) * 10000
  const sKey = Math.floor((hsl.s * 100) / 5) * 100
  const lKey = Math.floor((hsl.l * 100) / 5)
  return hKey + sKey + lKey
}
