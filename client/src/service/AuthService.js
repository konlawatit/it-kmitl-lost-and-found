import axios from 'axios';

const url = 'http://localhost:8888/apis/auth';

class AuthService {
    static async login(payload, state) {
        try {
            let res = await axios.post(`${url}/login`, {"idtoken": payload, "state": state})
            console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
    }
    static async saveProfile(payload) {
        try {

            let res = await axios.post(`${url}/login/confirm/${payload.email}`, payload.fd)
            console.log('regois',res.data)
            return res.data
        } catch (err) {
            return err
        }
    }
    static getAllUser() {
        try {
            return axios.get(`${url}/alluser`).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }

    static getAllUserBan() {
        try {
            return axios.get(`${url}/alluserban`).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }

    static normaltoAdmin(id) {
        try {
            return axios.post(`${url}/normaltoadmin`, {id:id}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }

    static admintoNormal(id) {
        try {
            return axios.post(`${url}/admintonormal`, {id:id}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }

    static banUser(id) {
        try {
            return axios.post(`${url}/banuser`, {id:id}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }

    static unlockBanUser(id) {
        try {
            return axios.post(`${url}/unlockbanuser`, {id:id}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }

    static searchUser(text) {
        try {
            return axios.post(`${url}/searchuser`, {text:text}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }

    static searchUserBan(text) {
        try {
            return axios.post(`${url}/searchuserban`, {text:text}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }
}

export default AuthService;