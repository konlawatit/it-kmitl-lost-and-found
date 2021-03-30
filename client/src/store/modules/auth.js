
const state = {
    fullname: '',
    fname: '',
    lname: '',
    email: '',
    image: window.API_URL + "/",
    id: '',
    role: '',
    isSigned: false
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
    getRole: (state) => {
        return state.role
    },
    getSigned: (state) => {
        return state.isSigned
    }

}

const mutations = {
    setProfile: (state, payload) => {
        state.fullname = payload.fullname
        state.fname = payload.fname
        state.lname = payload.lname
        state.email = payload.email
        state.image = payload.image
        state.id = payload.id
        state.role = payload.role
        state.isSigned = payload.isSigned
    },
    clearProfile: (state) => {
        state.fullname = ''
        state.fname = ''
        state.lname = ''
        state.email = ''
        state.image = ''
        state.id = ''
        state.role = ''
        state.isSigned = false
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