export const state = () => ({
  clusterColors: [],
  colorsInfo: [],
  loopColors: [
    ['rgb(222,244,255)', 'rgb(183,189,255)'],
    ['rgba(27,72,177,0.3)', 'rgba(27,72,177,0.7)'],
    ['rgba(74,192,223,0.3)', 'rgba(74,192,223,0.7)'],
    ['rgba(140,114,192,0.3)', 'rgba(140,114,192,0.7)'],
  ],
  score: '',
  processInfo: {
    colors: 0,
    censusTime: 0,
    kmeansIteration: 0,
    kmeansTime: 0,
    top5Count: 0,
    showQr: false,
  },
  mainColor: ['#000000', '#333333', '#666666'],
  averageColor: '#000000',
})

export const mutations = {
  setScore(state, score) {
    state.score = score
  },
  setLoopColors(state, loopColors) {
    state.loopColors = loopColors
  },
  setMainColor(state, mainColor) {
    state.mainColor = mainColor
  },
  setAverageColor(state, averageColor) {
    state.averageColor = averageColor
  },
  setClusterColors(state, clusterColors) {
    state.clusterColors = clusterColors
  },
  setProcessInfo(state, processInfo) {
    state.processInfo = processInfo
  },
  setColorsInfo(state, colorsInfo) {
    state.colorsInfo = colorsInfo
  },
}

export const actions = {
  resetApp({ commit }) {
    commit('setClusterColors', [])
    commit('setLoopColors', [
      ['rgb(222,244,255)', 'rgb(183,189,255)'],
      ['rgba(27,72,177,0.3)', 'rgba(27,72,177,0.7)'],
      ['rgba(74,192,223,0.3)', 'rgba(74,192,223,0.7)'],
      ['rgba(140,114,192,0.3)', 'rgba(140,114,192,0.7)'],
    ])
    commit('setScore', '')
    commit('setProcessInfo', {
      colors: 0,
      censusTime: 0,
      kmeansIteration: 0,
      kmeansTime: 0,
      top5Count: 0,
      showQr: false,
    })
    commit('setMainColor', '')
    commit('setAverageColor', '')
    // theme
    commit('theme/setPrimaryColor', '')
    commit('theme/setAccentColor', '')
  },
}
