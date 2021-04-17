
const state = {
    selectRoom: {
        user_id: '',
        user_name: ''
    },
    messages: [],
    rooms: []
}

const getters = {
    getSelectRoom: (state) => {
        return state.selectRoom
    },
    getMessages: (state) => {
        return state.messages
    },
    getRooms: (state) => {
        return state.rooms
    }

}

const mutations = {
    setSelectRoom: (state, payload) => {
        state.selectRoom.user_id = payload.user_id,
        state.selectRoom.user_name = payload.user_name
    },
    setMessages: (state, payload) => {
        state.messages = payload
    },
    setRooms: (state, payload) => {
        state.rooms = payload
    }
}

const actions = {
    setSelectRoom: (context, payload) => {
        context.commit('setSelectRoom', payload)
    },
    setMessages: (context, payload) => {
        context.commit('setMessages', payload)
    },
    setRooms: (context, payload) => {
        context.commit('setRooms', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };