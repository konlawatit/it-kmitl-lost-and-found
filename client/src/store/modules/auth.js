
const state = {
    fullname: '',
    fname: '',
    lname: '',
    email: '',
    image: '',
    id: '',
    role: '',
    isSigned: false,
    type: '',
    phone_number: '',
    birthday: '',
    merit: ''
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
    },
    getType: (state) => {
        return state.type
    },
    getPhone_number: (state) => {
        return state.phone_number
    },
    getBirthday: (state) => {
        return state.birthday
    },
    getMerit: (state) => {
        return state.merit
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
        state.isSigned = payload.isSigned,
        state.type = payload.type,
        state.phone_number = payload.phone_number,
        state.birthday = payload.birthday,
        state.merit = payload.merit
    },
    clearProfile: (state) => {
        state.fullname = ''
        state.fname = ''
        state.lname = ''
        state.email = ''
        state.image = ''
        state.id = ''
        state.role = ''
        state.isSigned = false,
        state.type = '',
        state.phone_number = '',
        state.birthday = '',
        state.merit = ''
    },
    updateProfile: (state, payload) => {
        state.fullname = payload.fullname
        state.fname = payload.fname,
        state.lname = payload.lname,
        state.image = payload.image,
        state.phone_number = payload.phone_number
        state.birthday = payload.birthday
    }

}

const actions = {
    setProfile: (context, payload) => {
        context.commit('setProfile', payload)
    },
    clearProfile: (context) => {
        context.commit('clearProfile')
    },
    updateProfile: (context, payload) => {
        context.commit('updateProfile', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };