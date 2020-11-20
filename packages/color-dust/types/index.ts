import { TinyColor } from '@ctrl/tinycolor'

/**
 * 分析信息
 */
export interface AnalysisInfo {
  total: number
  top50Count: number
  top20Count: number
  top10Count: number
  top5Count: number
}

/**
 * 处理结果信息
 */
export interface ProcessInfo {
  /**
   * 色彩数量
   */
  numberOfColors: number
  censusTime: number
  kmeansIteration: number
  kmeansTime: number
  top5Count: number
  colorStep?: number
  /**
   * 像素数量
   */
  pixelCount: number
}

/**
 * 基础的颜色信息
 */
export interface BaseColorInfo {
  color: TinyColor
  /**
   * 数量
   */
  count: number
}

/**
 * 色彩信息
 */
export interface ColorInfo extends BaseColorInfo {
  key?: number
  /**
   * 种类
   */
  category: number
}
