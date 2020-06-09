export const state = () => ({
  drawer: false,
})

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer
  },
}
