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

            let res = await axios.post(`${url}/login/confirm/${payload.user_id}`, payload.fd)
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
}

export default AuthService;