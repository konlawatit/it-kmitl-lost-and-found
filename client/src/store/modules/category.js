
const state = {
    itemSelect: ""
}

const getters = {
    getItem: (state) => {
        return state.itemSelect
    },

}

const mutations = {
    changSelect: (state, item) => {
        state.itemSelect  = item
    },
}

const actions = {
    changSelect: (context, item) => {
        context.commit('changSelect', item)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };