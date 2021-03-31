import axios from 'axios';

const url = 'http://localhost:8888/apis/auth';

class AuthService {
    static login(payload, state) {
        try {
            return axios.post(`${url}/login`, {"idtoken": payload, "state": state}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }
    static saveProfile(payload) {
        try {
            return axios.post(`${url}/login/confirm/${payload.user_id}`, payload.fd).then(result => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }
}

export default AuthService;