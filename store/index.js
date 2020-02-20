export const state = () => ({
  loopColors: [
    ['rgb(222,244,255)', 'rgb(183,189,255)'],
    ['rgba(27,72,177,0.3)', 'rgba(27,72,177,0.7)'],
    ['rgba(74,192,223,0.3)', 'rgba(74,192,223,0.7)'],
    ['rgba(140,114,192,0.3)', 'rgba(140,114,192,0.7)']
  ],
  score: '',
  processInfo: {
    colors: 0,
    censusTime: 0,
    kmeansIteration: 0,
    kmeansTime: 0,
    top5Count: 0,
    showQr: false
  }
})

export const mutations = {
  resetApp(state) {
    state.clusterColors = []
    state.loopColors = [
      ['rgb(222,244,255)', 'rgb(183,189,255)'],
      ['rgba(27,72,177,0.3)', 'rgba(27,72,177,0.7)'],
      ['rgba(74,192,223,0.3)', 'rgba(74,192,223,0.7)'],
      ['rgba(140,114,192,0.3)', 'rgba(140,114,192,0.7)']
    ]
    state.score = ''
    state.processInfo = {
      colors: 0,
      censusTime: 0,
      kmeansIteration: 0,
      kmeansTime: 0,
      top5Count: 0,
      showQr: false
    }
  }
}
