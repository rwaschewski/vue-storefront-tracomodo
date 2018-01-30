const state = {
  options: [],
  gender: '',
  style: '',
  colors: []
}
const getters = {
  options: (state) => state.options,
  gender: (state) => state.gender,
  style: (state) => state.style,
  colors: (state) => state.colors
}
const mutations = {
  ADD_OPTION (state, { payload }) {
    state.options.push({payload})
  },
  ADD_COLOR (state, payload) {
    var color = []
    payload.color.forEach(function (element) {
      color.push(element.alt)
    })
    state.colors = color
  },
  SET_GENDER (state, payload) {
    state.gender = payload.gender
  },
  SET_STYLE (state, payload) {
    state.style += payload.style + ' '
  },
  RESET (state) {
    state.style = ''
    state.gender = ''
    state.colors = []
  }
}
const actions = {
  addColor ({context}, color) {
    context.commit('ADD_COLOR', color)
  },
  addOption ({commit, state}, { option }) {
    commit('ADD_OPTION', { option })
  },
  setGender ({ commit, state }, gender) {
    commit('SET_GENDER', { gender })
  },
  setStyles (context) {
    context.commit('SET_STYLE')
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
