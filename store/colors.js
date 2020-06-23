export const state = () => ({
  total: 0,
  initSeed: [],
})

export const mutations = {
  setTotal(state, total) {
    state.total = total
  },
  setInitSeed(state, initSeed) {
    state.initSeed = initSeed
  },
}
