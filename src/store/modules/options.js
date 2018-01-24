const state = {
  gender: '',
  styles: []
}
const getters = {
  optionsSelected (state) {
    return {
      gender: state.gender,
      styles: state.styles
    }
  }
}
const mutations = {
  setOptions (state, payload) {
  }
}
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
