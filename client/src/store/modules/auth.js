
const state = {
    fullname: '',
    fname: '',
    lname: '',
    email: '',
    image: '',
    id: ''
}

const getters = {
    getFullName: (state) => {
        return state.fullname
    },
    getfname: (state) => {
        return state.fname
    },
    getlname: (state) => {
        return state.lname
    },
    getEmail: (state) => {
        return state.email
    },
    getImage: (state) => {
        return state.image
    },
    getId: (state) => {
        return state.id
    },

}

const mutations = {
    setProfile: (state, payload) => {
        state.fullname = payload.fullname
        state.fname = payload.fname
        state.lname = payload.lname
        state.email = payload.email
        state.image = payload.image
        state.id = payload.id
    },
    clearProfile: (state) => {
        state.fullname = ''
        state.fname = ''
        state.lname = ''
        state.email = ''
        state.image = ''
        state.id = ''
    }

}

const actions = {
    setProfile: (context, payload) => {
        context.commit('setProfile', payload)
    },
    clearProfile: (context) => {
        context.commit('clearProfile')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };