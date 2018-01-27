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
    var color
    payload.color.forEach(function (element) {
      if (element.selected === true) {
        color = element.alt
      }
    })
    state.colors.push(color)
  },
  SET_GENDER (state, payload) {
    state.gender = payload.gender
  },
  SET_STYLE (state, payload) {
    state.style = payload.style
  }
}
const actions = {
  addOption ({commit, state}, { option }) {
    commit('options/ADD_OPTION', { option })
  },
  setGender ({ commit, state }, gender) {
    commit('options/SET_GENDER', { gender })
  },
  setStyles (context) {
    context.commit('options/SET_STYLE')
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
