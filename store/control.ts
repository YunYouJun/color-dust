import { MutationTree } from 'vuex'

export const state = () => ({
  /**
   * 图表展示状态
   */
  display: {
    barChart: false,
    pieChart: false,
    relationChart: false,
    wordCloud: false,
    bubbleChart: false,
  },
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  /**
   * 设置图表状态
   * @param state
   * @param type
   */
  setDisplayChart(state: any, payload) {
    state.display[payload.type] = payload.display
  },
}
