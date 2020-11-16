export const state = () => ({
  displayChart: false,
})

export const mutations = {
  /**
   * 设置图表展示状态
   * @param {*} state
   * @param {boolean} status
   */
  setDisplayChart(state, status) {
    state.displayChart = status
  },
}
