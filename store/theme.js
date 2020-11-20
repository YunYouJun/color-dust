export const state = () => ({
  isExchanged: false,
  primaryColor: null,
  accentColor: null,
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
      return state.primaryColor ? state.primaryColor.toHexString() : ''
    } else {
      return state.accentColor ? state.accentColor.toHexString() : ''
    }
  },
  getFgColor(state) {
    if (!state.isExchanged) {
      return state.accentColor ? state.accentColor.toHexString() : ''
    } else {
      return state.primaryColor ? state.primaryColor.toHexString() : ''
    }
  },
}
