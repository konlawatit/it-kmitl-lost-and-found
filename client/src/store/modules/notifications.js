
const state = {
    chats: 0
}

const getters = {
    getChat: (state) => {
        return state.chats
    },

}

const mutations = {
    addChats: (state) => {
        state.chats += 1
    },
    minusChats: (state, num) => {
        state.chats -= num
    }
}

const actions = {
    addChats: (context) => {
        context.commit('addChats')
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };