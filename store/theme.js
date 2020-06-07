export const state = () => ({
  isExchanged: false,
  primaryColor: '',
  accentColor: '',
})

export const mutations = {
  setPrimaryColor(state, primaryColor) {
    state.primaryColor = primaryColor
  },
  setAccentColor(state, accentColor) {
    state.accentColor = accentColor
  },
  exchange(state) {
    state.isExchanged = !state.isExchanged
  },
}

export const getters = {
  getBgColor(state) {
    if (!state.isExchanged) {
      return state.primaryColor
    } else {
      return state.accentColor
    }
  },
  getFgColor(state) {
    if (!state.isExchanged) {
      return state.accentColor
    } else {
      return state.primaryColor
    }
  },
}
